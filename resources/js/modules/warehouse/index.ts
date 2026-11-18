import { warehousePages } from '@/modules/warehouse/data';
import WarehouseModulePage from '@/modules/warehouse/pages/WarehouseModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const warehouseModule: ErpModuleManifest = {
    key: 'warehouse',
    groupLabel: 'Gudang & Material',
    icon: '▣',
    navItems: [
        { label: 'Stok Bahan Baku', page: 'stockRaw' },
        { label: 'Stok Inventory / Master Produk', page: 'stockInventory' },
        { label: 'Stok Material', page: 'stockMaterial' },
        { label: 'Mutasi Stok', page: 'warehouse' },
        { label: 'Barang Masuk / Keluar', page: 'stockMoves' },
        { label: 'Purchase Material', page: 'materialPurchase' },
        { label: 'Penerimaan Material', page: 'materialReceipt' },
        {
            label: 'Riwayat Penerimaan Material',
            page: 'materialReceiptHistory',
        },
        { label: 'Material Keluar', page: 'materialIssue' },
        { label: 'Distribusi Material', page: 'materialDistribution' },
        {
            label: 'Laporan Distribusi Material',
            page: 'materialDistributionReport',
        },
        { label: 'Master Material', page: 'masterMaterial' },
        {
            label: 'Laporan Pembelian Material',
            page: 'materialPurchaseReport',
        },
    ],
    pages: warehousePages,
    components: {
        default: WarehouseModulePage,
    },
};
