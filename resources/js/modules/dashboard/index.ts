import { dashboardPages } from '@/modules/dashboard/data';
import DashboardPage from '@/modules/dashboard/pages/DashboardPage.vue';
import GuidePage from '@/modules/dashboard/pages/GuidePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const dashboardModule: ErpModuleManifest = {
    key: 'dashboard',
    groupLabel: 'Dashboard',
    icon: '◫',
    single: true,
    navItems: [{ label: 'Dashboard', page: 'dashboard' }],
    pages: dashboardPages,
    components: {
        dashboard: DashboardPage,
        guide: GuidePage,
    },
};
