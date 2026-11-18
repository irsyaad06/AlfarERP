<script setup lang="ts">
import ErpNoticeBanner from '@/components/erp/ErpNoticeBanner.vue';
import ErpPageHeader from '@/components/erp/ErpPageHeader.vue';
import ErpStatCard from '@/components/erp/ErpStatCard.vue';
import AttentionAlertCard from '@/modules/dashboard/components/AttentionAlertCard.vue';
import OperationalFlowCard from '@/modules/dashboard/components/OperationalFlowCard.vue';
import ProductionStageProgressCard from '@/modules/dashboard/components/ProductionStageProgressCard.vue';
import QuickShortcutsCard from '@/modules/dashboard/components/QuickShortcutsCard.vue';
import type { ErpPageKey, ErpPageSchema } from '@/types/erp';

defineProps<{
    schema: ErpPageSchema;
    currentPageKey: ErpPageKey;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
}>();
</script>

<template>
    <div>
        <ErpPageHeader
            :schema="schema"
            :current-page-key="currentPageKey"
            @navigate="(page) => emit('navigate', page)"
            @action="(act) => emit('action', act)"
        />

        <ErpNoticeBanner variant="illustration">
            ⓘ Prototipe visual · data aktual tidak ditampilkan
        </ErpNoticeBanner>

        <div v-if="schema.kpis?.length" class="stats-grid">
            <ErpStatCard
                v-for="([label, value, desc], idx) in schema.kpis"
                :key="`kpi-${idx}`"
                :label="label"
                :value="value"
                :description="desc"
            />
        </div>

        <div class="dashboard-grid">
            <OperationalFlowCard @navigate="(page) => emit('navigate', page)" />
            <QuickShortcutsCard @navigate="(page) => emit('navigate', page)" />
        </div>

        <div class="lower-grid">
            <ProductionStageProgressCard
                @navigate="(page) => emit('navigate', page)"
            />
            <AttentionAlertCard @navigate="(page) => emit('navigate', page)" />
        </div>
    </div>
</template>
