<script setup lang="ts">
import { reactive, watch } from 'vue';
import ErpFormField from '@/components/erp/ErpFormField.vue';
import { parseErpField } from '@/composables/erp/useErpFieldParser';
import type { ErpFieldInput } from '@/types/erp';

const props = defineProps<{
    filters: ErpFieldInput[];
    pageKey: string;
}>();

const emit = defineEmits<{
    reset: [];
    filterChange: [values: Record<string, string>];
}>();

const filterValues = reactive<Record<string, string>>({});

function resetFilters(notifyParent = true): void {
    Object.keys(filterValues).forEach((key) => {
        filterValues[key] = '';
    });

    emit('filterChange', { ...filterValues });
    if (notifyParent) {
        emit('reset');
    }
}

function updateField(field: ErpFieldInput, value: string): void {
    const label = parseErpField(field).label;
    filterValues[label] = value;
    emit('filterChange', { ...filterValues });
}

watch(
    () => props.pageKey,
    () => {
        resetFilters(false);
    },
);
</script>

<template>
    <section class="card filter-card">
        <div class="filter-heading">
            <div>
                <h2 class="card-title">Filter & pencarian</h2>
                <p class="card-desc">
                    Gunakan filter untuk membatasi daftar tanpa berpindah
                    halaman.
                </p>
            </div>
            <button type="button" class="button" @click="resetFilters(true)">
                Reset filter
            </button>
        </div>

        <div class="field-grid">
            <ErpFormField
                v-for="(filter, idx) in filters"
                :key="`${pageKey}-filter-${idx}`"
                :field="filter"
                :name-prefix="`${pageKey}-filter`"
                :model-value="filterValues[parseErpField(filter).label] ?? ''"
                @update:model-value="(val) => updateField(filter, val)"
            />
        </div>
    </section>
</template>
