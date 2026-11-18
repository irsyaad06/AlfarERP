import type { Component } from 'vue';
import ErpStandardPageView from '@/components/erp/ErpStandardPageView.vue';
import { accessModule } from '@/modules/access';
import { dashboardModule } from '@/modules/dashboard';
import { ordersModule } from '@/modules/orders';
import { ppicModule } from '@/modules/ppic';
import { productionModule } from '@/modules/production';
import { qcReportingModule } from '@/modules/qc-reporting';
import { rawMaterialModule } from '@/modules/raw-material';
import { shippingModule } from '@/modules/shipping';
import { warehouseModule } from '@/modules/warehouse';
import type { ErpModuleManifest, ErpPageKey, ErpPageSchema } from '@/types/erp';

export const ERP_MODULES: ErpModuleManifest[] = [
    dashboardModule,
    ordersModule,
    ppicModule,
    rawMaterialModule,
    warehouseModule,
    productionModule,
    shippingModule,
    qcReportingModule,
    accessModule,
];

export const ERP_PAGES_MAP: Record<ErpPageKey, ErpPageSchema> =
    ERP_MODULES.reduce(
        (acc, mod) => {
            Object.entries(mod.pages).forEach(([key, schema]) => {
                acc[key as ErpPageKey] = schema;
            });
            return acc;
        },
        {} as Record<ErpPageKey, ErpPageSchema>,
    );

export function isValidErpPageKey(key: string): key is ErpPageKey {
    return key in ERP_PAGES_MAP;
}

export function getErpPageSchema(pageKey: ErpPageKey): ErpPageSchema {
    return ERP_PAGES_MAP[pageKey] ?? ERP_PAGES_MAP.dashboard;
}

export function getErpModuleForPage(pageKey: ErpPageKey): ErpModuleManifest {
    const schema = getErpPageSchema(pageKey);
    return (
        ERP_MODULES.find((mod) => mod.key === schema.moduleKey) ??
        dashboardModule
    );
}

export function getErpPageComponent(pageKey: ErpPageKey): Component {
    const mod = getErpModuleForPage(pageKey);
    return (
        mod.components?.[pageKey] ??
        mod.components?.default ??
        ErpStandardPageView
    );
}
