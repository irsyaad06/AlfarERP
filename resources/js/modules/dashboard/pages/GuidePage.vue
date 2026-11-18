<script setup lang="ts">
import ErpStandardPageView from '@/components/erp/ErpStandardPageView.vue';
import OperationalFlowCard from '@/modules/dashboard/components/OperationalFlowCard.vue';
import type { ErpPageKey, ErpPageSchema } from '@/types/erp';

defineProps<{
    schema: ErpPageSchema;
    currentPageKey: ErpPageKey;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
    rowAction: [actionName: string, row: string[]];
}>();

const moduleDefaultPageMap: Record<string, ErpPageKey> = {
    '01': 'poActive',
    '02': 'scheduleTarget',
    '03': 'freshReceipt',
    '04': 'stockRaw',
    '05': 'spk',
    '06': 'loadingShipping',
};

function handleRowAction(actionName: string, row: string[]): void {
    const stepCode = row[0] ?? '';
    if (moduleDefaultPageMap[stepCode]) {
        emit('navigate', moduleDefaultPageMap[stepCode]);
        return;
    }
    emit('rowAction', actionName, row);
}

function handleAction(actionName: string): void {
    if (actionName === 'Kembali ke Dashboard') {
        emit('navigate', 'dashboard');
        return;
    }
    emit('action', actionName);
}
</script>

<template>
    <ErpStandardPageView
        :schema="schema"
        :current-page-key="currentPageKey"
        @navigate="(page) => emit('navigate', page)"
        @action="handleAction"
        @row-action="handleRowAction"
    >
        <template #beforeFilters>
            <div style="margin-bottom: 13px">
                <OperationalFlowCard
                    @navigate="(page) => emit('navigate', page)"
                />
            </div>
        </template>
    </ErpStandardPageView>
</template>
