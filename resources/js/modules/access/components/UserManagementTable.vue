<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ErpStatusBadge from '@/components/erp/ErpStatusBadge.vue';
import { USER_ROLES } from '@/modules/access/data';
import type { ErpPageKey } from '@/types/erp';

const props = withDefaults(
    defineProps<{
        columns: string[];
        rows: string[][];
        externalSearchQuery?: string;
    }>(),
    {
        externalSearchQuery: '',
    },
);

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
    rowAction: [actionName: string, row: string[]];
}>();

const currentPage = ref(1);
const selectedRoles = reactive<Record<number, string>>({});

function getSelectedRole(rowIndex: number, initialRole: string): string {
    return selectedRoles[rowIndex] ?? initialRole;
}

function updateSelectedRole(rowIndex: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    selectedRoles[rowIndex] = target.value;
}

const filteredRows = computed(() => {
    const q = props.externalSearchQuery.trim().toLowerCase();
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
</script>

<template>
    <section class="card table-card">
        <div class="card-header">
            <div>
                <h2 class="card-title">
                    Daftar Pengguna Terdaftar &amp; Manajemen Otoritas
                </h2>
                <p class="card-desc">
                    Ubah role per pengguna, edit akun, atau hapus melalui aksi
                    yang sesuai. Mode demo tidak menyimpan perubahan.
                </p>
            </div>
            <ErpStatusBadge variant="info" label="7 role teramati" />
        </div>

        <div
            tabindex="0"
            role="region"
            aria-label="Daftar Pengguna Terdaftar & Manajemen Otoritas"
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
                    <tr
                        v-for="(row, rowIndex) in filteredRows"
                        :key="row[1] ?? rowIndex"
                    >
                        <td>{{ row[0] }}</td>
                        <td>
                            <span class="cell-main">{{ row[1] }}</span>
                        </td>
                        <td>{{ row[2] }}</td>
                        <td>{{ row[3] }}</td>
                        <td>
                            <div class="role-edit">
                                <select
                                    class="select"
                                    :aria-label="`Role untuk ${row[1]}`"
                                    :value="getSelectedRole(rowIndex, row[4])"
                                    @change="
                                        updateSelectedRole(rowIndex, $event)
                                    "
                                >
                                    <option
                                        v-for="role in USER_ROLES"
                                        :key="role"
                                        :value="role"
                                    >
                                        {{ role }}
                                    </option>
                                </select>
                                <button
                                    type="button"
                                    class="row-action"
                                    @click="emit('action', 'Simpan Role')"
                                >
                                    Simpan
                                </button>
                            </div>
                        </td>
                        <td>
                            <ErpStatusBadge
                                :variant="
                                    row[5] === 'Aktif' ? 'success' : 'muted'
                                "
                                :label="row[5]"
                            />
                        </td>
                        <td>
                            <button
                                type="button"
                                class="row-action"
                                @click="emit('rowAction', 'Edit Akun', row)"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                class="row-action"
                                @click="emit('navigate', 'userPassword')"
                            >
                                Reset password
                            </button>
                            <button
                                type="button"
                                class="row-action danger-action"
                                @click="emit('rowAction', 'Hapus User', row)"
                            >
                                Hapus
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-footer">
            <span>Data pengguna disamarkan untuk prototype.</span>
            <div class="pagination" role="navigation" aria-label="Paginasi">
                <button
                    type="button"
                    aria-label="Halaman sebelumnya"
                    @click="currentPage = Math.max(1, currentPage - 1)"
                >
                    ‹
                </button>
                <button
                    type="button"
                    :class="{ current: currentPage === 1 }"
                    @click="currentPage = 1"
                >
                    1
                </button>
                <button
                    type="button"
                    :class="{ current: currentPage === 2 }"
                    @click="currentPage = 2"
                >
                    2
                </button>
                <button
                    type="button"
                    aria-label="Halaman berikutnya"
                    @click="currentPage = Math.min(2, currentPage + 1)"
                >
                    ›
                </button>
            </div>
        </div>
    </section>
</template>
