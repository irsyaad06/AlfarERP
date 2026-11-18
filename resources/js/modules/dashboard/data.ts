import type { ErpPageSchema } from '@/types/erp';

export const DASHBOARD_FLOW_NODES = [
    {
        step: '01 · Order',
        title: 'PO / Reguler / MBG',
        subtitle: 'Permintaan & customer',
        targetPage: 'poActive' as const,
        state: 'done' as const,
    },
    {
        step: '02 · PPIC',
        title: 'Schedule target',
        subtitle: 'Target & bahan baku',
        targetPage: 'scheduleTarget' as const,
        state: 'done' as const,
    },
    {
        step: '03 · Bahan baku',
        title: 'Tally Fresh / Frozen',
        subtitle: 'Penerimaan & distribusi',
        targetPage: 'freshReceipt' as const,
        state: 'active' as const,
    },
    {
        step: '04 · Produksi',
        title: 'SPK & tahapan',
        subtitle: 'Gramasi · chilling · pack',
        targetPage: 'dailyProduction' as const,
        state: 'pending' as const,
    },
    {
        step: '05 · Fulfillment',
        title: 'Finish Good & shipping',
        subtitle: 'Loading · surat jalan',
        targetPage: 'loadingShipping' as const,
        state: 'pending' as const,
    },
];

export const DASHBOARD_SHORTCUTS = [
    { label: 'Manajemen User', targetPage: 'users' as const },
    { label: 'Input PO', targetPage: 'poInput' as const },
    { label: 'Tally Frozen Masuk', targetPage: 'frozenReceipt' as const },
    { label: 'Tally Fresh Masuk', targetPage: 'freshReceipt' as const },
    {
        label: 'Distribusi Material',
        targetPage: 'materialDistribution' as const,
    },
    { label: 'SPK', targetPage: 'spk' as const },
];

export const DASHBOARD_PRODUCTION_STAGES = [
    { label: 'Target Produksi', value: '—', unit: 'Pack' },
    { label: 'Gramasi-Chilling', value: '—', unit: 'Kg' },
    { label: 'Gramasi-FinishGood', value: '—', unit: 'Kg' },
    { label: 'Hasil Pack', value: '—', unit: 'Kg / pack' },
    { label: 'Finish Good', value: '—', unit: 'Kg / pack' },
    { label: 'BB Fresh / Frozen', value: '— / —', unit: 'Kg' },
];

export const DASHBOARD_ATTENTION_ITEMS = [
    {
        title: 'PO dengan kebutuhan BB',
        subtitle: 'Buka analisa PO dan schedule target',
        targetPage: 'poAnalysis' as const,
        variant: 'amber' as const,
    },
    {
        title: 'Distribusi belum direkonsiliasi',
        subtitle: 'Tally Fresh / Frozen → produksi',
        targetPage: 'bbDistributionDetail' as const,
        variant: 'blue' as const,
    },
    {
        title: 'Realisasi SPK / retur',
        subtitle: 'Gramasi, pack, reject, dan return BB',
        targetPage: 'dailyProduction' as const,
        variant: 'amber' as const,
    },
];

export const dashboardPages: Record<string, ErpPageSchema> = {
    dashboard: {
        key: 'dashboard',
        moduleKey: 'dashboard',
        title: 'Dashboard Operasional',
        module: 'Ringkasan',
        desc: 'Pantau penerimaan, distribusi bahan baku, perencanaan, produksi, dan pengiriman dari satu halaman.',
        kpis: [
            ['PO aktif', '—', 'Dari seluruh jenis order'],
            ['SPK tercatat', '—', 'Periode terpilih'],
            ['Kebutuhan fresh', '—', 'Kg sesuai jadwal'],
            ['Kebutuhan frozen', '—', 'Kg sesuai jadwal'],
        ],
        columns: [
            'Tahap proses',
            'Sumber / referensi',
            'Status',
            'Tindakan berikutnya',
        ],
        rows: [
            ['Tally Fresh', 'Penerimaan & distribusi', '—', 'Tinjau tally'],
            ['Tally Frozen', 'Penerimaan & distribusi', '—', 'Tinjau tally'],
            ['PPIC', 'Schedule & kebutuhan material', '—', 'Buka schedule'],
            ['Produksi', 'SPK & hasil per tahap', '—', 'Pantau produksi'],
            ['Shipping', 'Jadwal & loading', '—', 'Buka shipping'],
        ],
        actions: ['Filter periode', 'Cetak laporan'],
        note: 'Panel dashboard aktual menampilkan progres produksi, ringkasan kebutuhan BB Fresh/Frozen, hasil gramasi, hasil pack, Finish Good, dan analisa per SPK. Angka transaksi tidak disalin ke prototype.',
    },
    guide: {
        key: 'guide',
        moduleKey: 'dashboard',
        title: 'Panduan Proses Alfar Butcher',
        module: 'Panduan Operasional',
        desc: 'Alur operasional terintegrasi dari penerimaan PO hingga pengiriman Finish Good dalam arsitektur Monolith Modular.',
        columns: [
            'Urutan Modul',
            'Nama Modul',
            'Fokus Operasional',
            'Output Utama',
            'Aksi Navigasi',
        ],
        rows: [
            [
                '01',
                'PO & Pesanan',
                'Input PO, PO Aktif, Analisa PO, Reguler & MBG',
                'Daftar kebutuhan SKU & tanggal kirim',
                'Buka modul',
            ],
            [
                '02',
                'PPIC & Perencanaan',
                'Schedule Target, Jadwal PO, Kalender Produksi & Rencana Kirim',
                'Target produksi harian & proyeksi kekurangan BB',
                'Buka modul',
            ],
            [
                '03',
                'Penerimaan & Distribusi BB',
                'Tally Fresh & Frozen masuk serta distribusi ke schedule/SPK',
                'Rekonsiliasi bahan baku Fresh & Frozen',
                'Buka modul',
            ],
            [
                '04',
                'Gudang & Material',
                'Stok BB, Master Produk, Stok Material, Purchase & Distribusi Material',
                'Mutasi stok & ketersediaan material pendukung',
                'Buka modul',
            ],
            [
                '05',
                'Produksi',
                'SPK, Gramasi-Chilling, Chilling IN-Out, Gramasi-Ampar, ABF2, Packing, Reject/Return',
                'Realisasi Finish Good per SPK',
                'Buka modul',
            ],
            [
                '06',
                'Shipping & Laporan QC',
                'Kalender Shipping, Loading & Surat Jalan, serta History/Laporan QC',
                'Pengiriman terverifikasi & audit trail QC',
                'Buka modul',
            ],
        ],
        actions: ['Kembali ke Dashboard', 'Cetak Panduan'],
        note: 'Arsitektur aplikasi dirancang sebagai Monolith Modular dengan pemisahan domain jelas (Orders, PPIC, Raw Material, Warehouse, Production, Shipping, QC Reporting, dan Access Control).',
    },
};
