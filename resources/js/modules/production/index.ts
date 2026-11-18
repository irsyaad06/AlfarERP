import { productionPages } from '@/modules/production/data';
import ProductionModulePage from '@/modules/production/pages/ProductionModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const productionModule: ErpModuleManifest = {
    key: 'production',
    groupLabel: 'Produksi',
    icon: '⚙',
    navItems: [
        { label: 'SPK', page: 'spk' },
        { label: 'Produksi Harian', page: 'dailyProduction' },
        { label: 'Gramasi-Chilling', page: 'gramasiChilling' },
        { label: 'Chilling IN-Out', page: 'chillingInOut' },
        { label: 'Gramasi-Ampar', page: 'gramasiAmpar' },
        { label: 'Chilling-Pack (ABF2)', page: 'chillingPack' },
        { label: 'Pack - Packing', page: 'packing' },
        { label: 'Monitoring Produksi', page: 'productionDisplay' },
        { label: 'Reject Finish Good Harian', page: 'finishGoodReject' },
        { label: 'Reject Internal Packing', page: 'internalReject' },
        { label: 'Return BB Internal', page: 'internalMaterialReturn' },
        { label: 'Laporan Produksi Harian', page: 'dailyProductionReport' },
        { label: 'Rekap Hasil Produksi', page: 'productionSummary' },
    ],
    pages: productionPages,
    components: {
        default: ProductionModulePage,
    },
};
