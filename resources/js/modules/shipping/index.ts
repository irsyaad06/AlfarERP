import { shippingPages } from '@/modules/shipping/data';
import ShippingModulePage from '@/modules/shipping/pages/ShippingModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const shippingModule: ErpModuleManifest = {
    key: 'shipping',
    groupLabel: 'Shipping',
    icon: '⇥',
    navItems: [
        { label: 'Kalender Shipping', page: 'shippingCalendar' },
        { label: 'Schedule Ship', page: 'shippingBoard' },
        { label: 'Loading & Shipping', page: 'loadingShipping' },
    ],
    pages: shippingPages,
    components: {
        default: ShippingModulePage,
    },
};
