<script setup lang="ts">
import { computed, ref } from 'vue';
import ErpActionStrip from '@/components/erp/ErpActionStrip.vue';
import ErpDataTable from '@/components/erp/ErpDataTable.vue';
import ErpFilterCard from '@/components/erp/ErpFilterCard.vue';
import ErpFormCard from '@/components/erp/ErpFormCard.vue';
import ErpNoticeBanner from '@/components/erp/ErpNoticeBanner.vue';
import ErpPageHeader from '@/components/erp/ErpPageHeader.vue';
import type { ErpPageKey, ErpPageSchema } from '@/types/erp';

const props = defineProps<{
    schema: ErpPageSchema;
    currentPageKey: ErpPageKey;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
    rowAction: [actionName: string, row: string[]];
}>();

const activeFilterSearch = ref('');

function handleFilterChange(values: Record<string, string>): void {
    const firstNonEmpty = Object.values(values).find(
        (v) => v.trim().length > 0,
    );
    activeFilterSearch.value = firstNonEmpty ?? '';
}

const hasEmptyPlaceholder = computed(() => {
    return !props.schema.columns && !props.schema.fields?.length;
});
</script>

<template>
    <div>
        <ErpPageHeader
            :schema="schema"
            :current-page-key="currentPageKey"
            @navigate="(page) => emit('navigate', page)"
            @action="(act) => emit('action', act)"
        />

        <ErpNoticeBanner
            v-if="schema.unavailable"
            variant="warning"
            title="Belum terverifikasi di website:"
        >
            {{ schema.desc }} Prototype mempertahankan menu ini sebagai item
            navigasi, dengan fungsi dan field diberi tanda rancangan.
        </ErpNoticeBanner>

        <ErpNoticeBanner
            v-if="schema.note"
            variant="audit"
            title="Catatan audit:"
        >
            {{ schema.note }}
        </ErpNoticeBanner>

        <slot name="beforeFilters" />

        <ErpFilterCard
            v-if="schema.filters?.length"
            :filters="schema.filters"
            :page-key="currentPageKey"
            @reset="emit('action', 'Reset filter')"
            @filter-change="handleFilterChange"
        />

        <ErpFormCard
            v-if="schema.fields?.length"
            :fields="schema.fields"
            :actions="schema.actions"
            :form-title="schema.formTitle"
            :page-key="currentPageKey"
            @submit-action="(act) => emit('action', act)"
        />

        <slot name="tableSection" :external-search-query="activeFilterSearch">
            <ErpDataTable
                v-if="schema.columns"
                :columns="schema.columns"
                :rows="schema.rows"
                :table-title="schema.tableTitle"
                :filters="schema.filters"
                :external-search-query="activeFilterSearch"
                @row-action="(act, row) => emit('rowAction', act, row)"
            />

            <section v-else-if="hasEmptyPlaceholder" class="card empty-state">
                <span class="empty-icon" aria-hidden="true">▤</span>
                <strong>Detail modul</strong>
                <p>Pilih tindakan atau filter untuk menelusuri halaman ini.</p>
            </section>
        </slot>

        <slot name="afterTable" />

        <ErpActionStrip
            v-if="schema.actions?.length"
            :actions="schema.actions"
            @action="(act) => emit('action', act)"
        />

        <ErpNoticeBanner variant="illustration" footer>
            ⓘ Prototype UI/UX · tidak terhubung ke database atau API
        </ErpNoticeBanner>
    </div>
</template>
