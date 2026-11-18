import { ppicPages } from '@/modules/ppic/data';
import PpicModulePage from '@/modules/ppic/pages/PpicModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const ppicModule: ErpModuleManifest = {
    key: 'ppic',
    groupLabel: 'PPIC & Perencanaan',
    icon: '◈',
    navItems: [
        { label: 'Schedule Target', page: 'scheduleTarget' },
        { label: 'Jadwal PO', page: 'poSchedule' },
        { label: 'Kalender Produksi', page: 'calendarProduction' },
        { label: 'Target Harian', page: 'dailyTarget' },
        { label: 'Rencana Pengiriman', page: 'shippingPlan' },
    ],
    pages: ppicPages,
    components: {
        default: PpicModulePage,
    },
};
