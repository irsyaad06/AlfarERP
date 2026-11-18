import type { Component } from 'vue';

export type ErpModuleKey =
    | 'dashboard'
    | 'orders'
    | 'ppic'
    | 'raw-material'
    | 'warehouse'
    | 'production'
    | 'shipping'
    | 'qc-reporting'
    | 'access';

export type ErpPageKey =
    // Dashboard & Guide
    | 'dashboard'
    | 'guide'
    // PO & Pesanan
    | 'poInput'
    | 'poActive'
    | 'poHistory'
    | 'poAnalysis'
    | 'poRecap'
    | 'mbg'
    | 'regular'
    | 'poPurchase'
    // PPIC & Perencanaan
    | 'scheduleTarget'
    | 'poSchedule'
    | 'calendarProduction'
    | 'dailyTarget'
    | 'shippingPlan'
    // Penerimaan & Distribusi BB
    | 'freshReceipt'
    | 'freshDist'
    | 'frozenReceipt'
    | 'frozenDistSchedule'
    | 'frozenDist'
    | 'bbDistributionDetail'
    | 'bbDistributionRecap'
    | 'frozenReturn'
    // Gudang & Material
    | 'stockRaw'
    | 'stockInventory'
    | 'stockMaterial'
    | 'warehouse'
    | 'stockMoves'
    | 'materialPurchase'
    | 'materialReceipt'
    | 'materialReceiptHistory'
    | 'materialIssue'
    | 'materialDistribution'
    | 'materialDistributionReport'
    | 'masterMaterial'
    | 'materialPurchaseReport'
    // Produksi
    | 'spk'
    | 'dailyProduction'
    | 'gramasiChilling'
    | 'chillingInOut'
    | 'gramasiAmpar'
    | 'chillingPack'
    | 'packing'
    | 'productionDisplay'
    | 'finishGoodReject'
    | 'internalReject'
    | 'internalMaterialReturn'
    | 'dailyProductionReport'
    | 'productionSummary'
    // Shipping
    | 'shippingCalendar'
    | 'shippingBoard'
    | 'loadingShipping'
    // Riwayat & Laporan QC
    | 'frozenReceiptHistory'
    | 'frozenDistHistory'
    | 'frozenReceiptReport'
    | 'frozenDistReport'
    | 'freshReceiptHistory'
    | 'freshDistHistory'
    | 'freshCombinedReport'
    | 'freshReceiptReport'
    | 'freshDistReport'
    // Akun & Akses
    | 'profile'
    | 'selfPassword'
    | 'users'
    | 'userAdd'
    | 'userPassword'
    | 'auditLog';

export type ErpRawFieldTuple = [label: string, typeSpec?: string];

export type ErpFieldInputType =
    | 'text'
    | 'search'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'email'
    | 'password'
    | 'readonly'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'file';

export interface ErpFieldDefinition {
    label: string;
    type: ErpFieldInputType;
    placeholder?: string;
    options?: string[];
}

export type ErpFieldInput = ErpRawFieldTuple | ErpFieldDefinition;

export type ErpKpiTuple = [label: string, value: string, desc: string];

export interface ErpPageSchema {
    key: ErpPageKey;
    moduleKey: ErpModuleKey;
    title: string;
    module: string;
    desc: string;
    unavailable?: boolean;
    kpis?: ErpKpiTuple[];
    filters?: ErpFieldInput[];
    fields?: ErpFieldInput[];
    formTitle?: string;
    tableTitle?: string;
    columns?: string[];
    rows?: string[][];
    actions?: string[];
    note?: string;
}

export interface ErpNavEntry {
    label: string;
    page: ErpPageKey;
}

export interface ErpModuleManifest {
    key: ErpModuleKey;
    groupLabel: string;
    icon: string;
    single?: boolean;
    defaultOpen?: boolean;
    navItems: ErpNavEntry[];
    pages: Record<string, ErpPageSchema>;
    components?: Record<string, Component>;
}

export interface ErpDrawerState {
    isOpen: boolean;
    mode: string;
    title: string;
    fields: ErpFieldDefinition[];
    isDelete: boolean;
}

export interface ErpToastState {
    isVisible: boolean;
    message: string;
}
