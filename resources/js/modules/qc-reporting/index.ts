import { qcReportingPages } from '@/modules/qc-reporting/data';
import QcReportingModulePage from '@/modules/qc-reporting/pages/QcReportingModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const qcReportingModule: ErpModuleManifest = {
    key: 'qc-reporting',
    groupLabel: 'Riwayat & Laporan QC',
    icon: '▥',
    navItems: [
        {
            label: 'History Penerimaan Frozen',
            page: 'frozenReceiptHistory',
        },
        { label: 'History Distribusi Frozen', page: 'frozenDistHistory' },
        {
            label: 'Laporan Penerimaan Frozen',
            page: 'frozenReceiptReport',
        },
        { label: 'Laporan Distribusi Frozen', page: 'frozenDistReport' },
        { label: 'History Penerimaan Fresh', page: 'freshReceiptHistory' },
        { label: 'History Distribusi Fresh', page: 'freshDistHistory' },
        {
            label: 'Laporan Fresh Masuk & Distribusi',
            page: 'freshCombinedReport',
        },
        { label: 'Laporan Penerimaan Fresh', page: 'freshReceiptReport' },
        { label: 'Laporan Distribusi Fresh', page: 'freshDistReport' },
    ],
    pages: qcReportingPages,
    components: {
        default: QcReportingModulePage,
    },
};
