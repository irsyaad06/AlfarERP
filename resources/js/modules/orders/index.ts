import { ordersPages } from '@/modules/orders/data';
import OrdersModulePage from '@/modules/orders/pages/OrdersModulePage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const ordersModule: ErpModuleManifest = {
    key: 'orders',
    groupLabel: 'PO & Pesanan',
    icon: '▤',
    defaultOpen: true,
    navItems: [
        { label: 'Input PO', page: 'poInput' },
        { label: 'PO Aktif', page: 'poActive' },
        { label: 'Riwayat PO', page: 'poHistory' },
        { label: 'Analisa PO', page: 'poAnalysis' },
        { label: 'Rekap PO', page: 'poRecap' },
        { label: 'MBG', page: 'mbg' },
        { label: 'Reguler', page: 'regular' },
        { label: 'Purchase Kekurangan BB', page: 'poPurchase' },
    ],
    pages: ordersPages,
    components: {
        default: OrdersModulePage,
    },
};
