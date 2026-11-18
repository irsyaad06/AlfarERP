<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { parseErpField } from '@/composables/erp/useErpFieldParser';
import type { ErpFieldInput } from '@/types/erp';

const props = withDefaults(
    defineProps<{
        columns: string[];
        rows?: string[][];
        tableTitle?: string;
        tableDescription?: string;
        footerCaption?: string;
        filters?: ErpFieldInput[];
        externalSearchQuery?: string;
    }>(),
    {
        rows: () => [],
        tableTitle: 'Daftar data',
        tableDescription:
            'Kolom dipertahankan dari halaman aktual atau diberi label ilustrasi bila belum teramati.',
        footerCaption: 'Contoh tampilan · data aktual tidak dimuat',
        filters: () => [],
        externalSearchQuery: '',
    },
);

const emit = defineEmits<{
    rowAction: [actionName: string, row: string[]];
    pageChange: [page: number];
}>();

const searchQuery = ref('');
const currentPage = ref(1);

const hasSearchFilter = computed(() => {
    return props.filters.some((f) => {
        const parsed = parseErpField(f);
        return (
            parsed.type === 'search' ||
            parsed.label.toLowerCase().includes('cari')
        );
    });
});

const filteredRows = computed(() => {
    const q = (searchQuery.value || props.externalSearchQuery)
        .trim()
        .toLowerCase();

    if (!q) {
        return props.rows;
    }

    return props.rows.filter((row) =>
        row.some((cell) => String(cell).toLowerCase().includes(q)),
    );
});

const tableLabelVars = computed(() => {
    const vars: Record<string, string> = {};
    props.columns.forEach((col, index) => {
        vars[`--label-${index + 1}`] = `"${col.replace(/"/g, '\\"')}"`;
    });
    return vars;
});

function isActionColumn(columnIndex: number, columnName: string): boolean {
    return columnIndex === props.columns.length - 1 && /Aksi/i.test(columnName);
}

function parseRowActions(cellValue: string | undefined): string[] {
    return String(cellValue || 'Detail')
        .split(/[·,]/)
        .map((action) => action.trim())
        .filter(Boolean);
}

function selectPage(page: number): void {
    currentPage.value = page;
    emit('pageChange', page);
}

watch(
    () => props.columns,
    () => {
        searchQuery.value = '';
        currentPage.value = 1;
    },
);
</script>

<template>
    <section class="card table-card">
        <div class="card-header">
            <div>
                <h2 class="card-title">{{ tableTitle }}</h2>
                <p class="card-desc">{{ tableDescription }}</p>
            </div>
            <div class="table-tools">
                <slot name="headerTools" />
                <input
                    v-if="hasSearchFilter"
                    v-model="searchQuery"
                    type="search"
                    class="search table-search"
                    placeholder="Cari di tabel…"
                    aria-label="Cari di tabel"
                />
            </div>
        </div>

        <div
            tabindex="0"
            role="region"
            :aria-label="tableTitle"
            class="table-wrap"
        >
            <table class="data-table" :style="tableLabelVars">
                <thead>
                    <tr>
                        <th v-for="col in columns" :key="col" scope="col">
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="filteredRows.length">
                        <tr
                            v-for="(row, rowIndex) in filteredRows"
                            :key="rowIndex"
                        >
                            <td
                                v-for="(col, colIndex) in columns"
                                :key="`${rowIndex}-${colIndex}`"
                                :data-label="col"
                            >
                                <span v-if="colIndex === 0" class="cell-main">
                                    {{ row[colIndex] || '—' }}
                                </span>

                                <template
                                    v-else-if="isActionColumn(colIndex, col)"
                                >
                                    <button
                                        v-for="act in parseRowActions(
                                            row[colIndex],
                                        )"
                                        :key="act"
                                        type="button"
                                        class="row-action"
                                        @click="emit('rowAction', act, row)"
                                    >
                                        {{ act }}
                                    </button>
                                </template>

                                <template v-else>
                                    {{ row[colIndex] || '—' }}
                                </template>
                            </td>
                        </tr>
                    </template>

                    <tr v-else>
                        <td :colspan="columns.length">
                            <div class="empty-state">
                                <span class="empty-icon" aria-hidden="true">
                                    ▤
                                </span>
                                <strong>
                                    Belum ada data untuk contoh layar ini
                                </strong>
                                <p>Data bisnis tidak disalin ke prototype.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-footer">
            <span>{{ footerCaption }}</span>
            <div class="pagination" role="navigation" aria-label="Paginasi">
                <button
                    type="button"
                    aria-label="Halaman sebelumnya"
                    @click="selectPage(Math.max(1, currentPage - 1))"
                >
                    ‹
                </button>
                <button
                    type="button"
                    :class="{ current: currentPage === 1 }"
                    @click="selectPage(1)"
                >
                    1
                </button>
                <button
                    type="button"
                    :class="{ current: currentPage === 2 }"
                    @click="selectPage(2)"
                >
                    2
                </button>
                <button
                    type="button"
                    aria-label="Halaman berikutnya"
                    @click="selectPage(Math.min(2, currentPage + 1))"
                >
                    ›
                </button>
            </div>
        </div>
    </section>
</template>
