import { rawMaterialPages } from '@/modules/raw-material/data';
import RawMaterialModulePage from '@/modules/raw-material/pages/RawMaterialModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const rawMaterialModule: ErpModuleManifest = {
    key: 'raw-material',
    groupLabel: 'Penerimaan & Distribusi BB',
    icon: '⇢',
    navItems: [
        { label: 'Tally Fresh Masuk', page: 'freshReceipt' },
        { label: 'Distribusi Fresh', page: 'freshDist' },
        { label: 'Tally Frozen Masuk', page: 'frozenReceipt' },
        {
            label: 'Distribusi Frozen dari Schedule',
            page: 'frozenDistSchedule',
        },
        { label: 'Distribusi Frozen', page: 'frozenDist' },
        { label: 'Detail Distribusi BB', page: 'bbDistributionDetail' },
        { label: 'Rekap Distribusi BB', page: 'bbDistributionRecap' },
        { label: 'Return Customer (CustT)', page: 'frozenReturn' },
    ],
    pages: rawMaterialPages,
    components: {
        default: RawMaterialModulePage,
    },
};
