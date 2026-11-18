# Product Requirements Document (PRD) - Logika Backend & Frontend Produksi

## 1. Ringkasan & Ruang Lingkup
Dokumen ini menjabarkan spesifikasi logika (*business logic*), operasi CRUD, dan interaksi data antara Backend (API) dan Frontend untuk sistem pelacakan produksi Rumah Potong Ayam (RPA). 
**Fokus utama:** Sistem bertindak sebagai *State Machine* di mana perpindahan bahan baku antar stasiun produksi (Foreman) diatur secara dinamis oleh rute yang ditetapkan di dalam SPK. Desain antarmuka (UI/UX) mengikuti master desain yang sudah ada dan di luar cakupan dokumen ini.

## 2. Model Data Utama (Struktur Entitas)
Berikut adalah entitas utama yang saling berelasi di dalam *database*:

1. **`orders` (PO/SO)**
   - Menyimpan pesanan dari pelanggan atau kebutuhan *buffer stock*.
2. **`spk` (Surat Perintah Kerja)**
   - `id_spk` (PK)
   - `id_order` (FK)
   - `tipe_alur` (Enum: `finish_good`, `chilling`, `chilling_ampar`)
   - `target_qty`
   - `status` (Draft, Active, Completed)
3. **`flow_templates` (Master Rute)**
   - Mendefinisikan urutan stasiun baku berdasarkan `tipe_alur`.
   - *Finish Good:* QC Fresh -> Gramasi -> Packing -> ABF 2 -> Cold Storage.
   - *Chilling:* QC Fresh -> Gramasi -> ABF 1 -> Packing -> ABF 2 -> Cold Storage.
   - *Chilling Ampar:* QC Fresh -> ABF 1 -> Gramasi -> Packing -> ABF 2 -> Cold Storage.
4. **`production_batch` (Data Fisik Barang)**
   - `id_batch` (PK)
   - `id_spk` (FK - SPK acuan)
   - `asal_bahan` (Enum: `tally_fresh`, `tally_frozen_thawing`)
   - `current_station` (Stasiun saat ini)
   - `next_station` (Stasiun tujuan selanjutnya berdasarkan template)
   - `status` (Enum: `waiting_acceptance`, `in_progress`, `completed`)
   - `qty_current` (Jumlah fisik saat ini)
5. **`inventory` (Stok Akhir)**
   - Mencatat stok beku (`Cold Storage 1`) dan stok produk jadi/chilled (`Cold Storage 2`).

## 3. Logika Alur Transisi (State Machine Logic)

Sistem bekerja dengan prinsip **"Terima - Proses - Selesaikan & Lempar"**. 
Frontend di setiap stasiun Foreman bertugas memanggil API untuk mengubah *state* dari `production_batch`.

### 3.1. Alur Hulu (Inbound & Kedatangan)
*   **Jalur Fresh:** `Tally Fresh` (Create Batch) -> Lempar ke `QC Fresh`.
*   **Jalur Frozen (Stok):** `Tally Frozen` -> Simpan ke `Cold Storage 1`. Saat dibutuhkan -> Tarik ke `Thawing` -> Lempar ke `QC Fresh`.
*   **Gerbang Utama (QC Fresh):** 
    - Foreman QC Fresh menerima data dari antrean (mengubah status menjadi `in_progress`).
    - Saat verifikasi fisik lolos, Foreman melakukan *Action* untuk memproses batch menjadi **Bahan Baku** dengan mengaitkannya ke `id_spk` yang aktif.
    - Backend mengecek `tipe_alur` dari SPK tersebut, menentukan `next_station`, dan mengirim data ke antrean stasiun berikutnya.

### 3.2. Alur Produksi Utama (Hilir)
1. Frontend Foreman memanggil daftar `production_batch` dengan `current_station = [ID Stasiun Foreman]` & `status = waiting_acceptance`.
2. Foreman menekan tombol **"Terima"**. Backend mengupdate status menjadi `in_progress`.
3. Foreman melakukan tugas fisiknya (Pematangan di ABF 1, Gramasi, atau Packing).
4. Foreman menekan tombol **"Selesai & Kirim"**. 
5. **Logic Backend Cerdas:** Backend membaca `flow_templates` berdasarkan `id_spk` dari batch tersebut. Backend secara otomatis mengubah `current_station` menjadi stasiun tujuan (misal dari Gramasi ke Packing), `next_station` diupdate, dan status kembali menjadi `waiting_acceptance` untuk stasiun yang baru.

## 4. Daftar Operasi CRUD & API Endpoints (Konsep Logika)

### A. Modul SPK (PPIC / Kepala Produksi)
*   `POST /api/spk` (Create) -> Membuat SPK baru berdasarkan PO, mendefinisikan `tipe_alur`.
*   `GET /api/spk` (Read) -> Mengambil daftar SPK aktif untuk ditampilkan ke seluruh Foreman.

### B. Modul Inbound & QC (Gerbang Awal)
*   `POST /api/batch/tally-fresh` (Create) -> Membuat `production_batch` baru dari penerimaan harian.
*   `POST /api/batch/thawing` (Create) -> Mengeluarkan stok frozen, membuat batch untuk dikirim ke QC Fresh.
*   `PUT /api/batch/{id}/qc-approve` (Update) -> Mengikat batch ke SPK, memicu backend untuk set `current_station` ke stasiun pertama sesuai `tipe_alur`.

### C. Modul Foreman (Dinamis untuk semua stasiun: Gramasi, ABF 1, Packing, ABF 2)
*   `GET /api/station/{station_name}/inbound` (Read) 
    *   *Logic:* `SELECT * FROM production_batch WHERE current_station = {station_name} AND status = 'waiting_acceptance'`
*   `GET /api/station/{station_name}/active` (Read) 
    *   *Logic:* `SELECT * FROM production_batch WHERE current_station = {station_name} AND status = 'in_progress'`
*   `PUT /api/batch/{id}/accept` (Update) 
    *   *Logic:* Mengubah status batch dari `waiting_acceptance` menjadi `in_progress`.
*   `PUT /api/batch/{id}/process-next` (Update) 
    *   *Logic:* Tombol sakti. Frontend hanya mengirim instruksi "Selesai". Backend yang menentukan ke mana data ini dilempar selanjutnya berdasarkan `flow_templates`.

### D. Modul Penyelesaian (Cold Storage Akhir)
*   `PUT /api/batch/{id}/complete` (Update)
    *   *Logic:* Digunakan oleh Foreman Cold Storage. Mengubah status batch menjadi `completed`, menutup data operasional, dan men-trigger sistem untuk men-generate stok baru di entitas `inventory` (Ready to Ship / DO).

## 5. Kebutuhan Logika Frontend (State Behavior)
Agar UI sinkron dengan API dan tidak membingungkan pengguna:
1. **Tidak Ada Dropdown Tujuan:** Frontend tidak perlu membuat dropdown "Kirim ke mana?" untuk Foreman. Logic murni di-handle oleh Backend via `process-next`.
2. **Auto-Refresh / Polling:** Komponen daftar *Inbound* (Menunggu Diterima) pada frontend Foreman harus melakukan sinkronisasi berkala (misal via WebSockets atau interval *fetching*) agar tahu jika ada kiriman baru dari stasiun sebelumnya secara *real-time*.
3. **Validasi:** Tombol "Selesai & Kirim" hanya bisa ditekan (enabled) jika status saat ini adalah `in_progress` (barang sudah diterima secara sistem).