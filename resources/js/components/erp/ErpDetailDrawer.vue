<script setup lang="ts">
import { ref, watch } from 'vue';
import ErpFormField from '@/components/erp/ErpFormField.vue';
import ErpNoticeBanner from '@/components/erp/ErpNoticeBanner.vue';
import type { ErpDrawerState } from '@/types/erp';

const props = defineProps<{
    drawer: ErpDrawerState;
}>();

const emit = defineEmits<{
    close: [];
    confirmAction: [actionLabel: string];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const sheetRef = ref<HTMLElement | null>(null);
const fieldValues = ref<Record<string, string>>({});

watch(
    () => props.drawer.isOpen,
    (isOpen) => {
        const dialog = dialogRef.value;
        if (!dialog) {
            return;
        }

        if (isOpen) {
            fieldValues.value = {};
            if (!dialog.open) {
                dialog.showModal();
            }
        } else if (dialog.open) {
            dialog.close();
        }
    },
);

function handleDialogClick(event: MouseEvent): void {
    const sheet = sheetRef.value;
    if (sheet && !sheet.contains(event.target as Node)) {
        emit('close');
    }
}

function handleDialogCancel(event: Event): void {
    event.preventDefault();
    emit('close');
}
</script>

<template>
    <dialog
        ref="dialogRef"
        class="erp-drawer-dialog"
        :class="{ open: drawer.isOpen }"
        aria-label="Panel detail"
        @click="handleDialogClick"
        @cancel="handleDialogCancel"
    >
        <aside
            id="detailDrawer"
            ref="sheetRef"
            class="detail-drawer"
            :class="{ open: drawer.isOpen }"
        >
            <div class="drawer-head">
                <div>
                    <span class="eyebrow">
                        {{ drawer.mode }} · mode prototype
                    </span>
                    <h3>{{ drawer.title }}</h3>
                </div>
                <button
                    type="button"
                    class="icon-button"
                    aria-label="Tutup"
                    autofocus
                    @click="emit('close')"
                >
                    ×
                </button>
            </div>

            <div class="drawer-body">
                <ErpNoticeBanner
                    :title="
                        drawer.isDelete
                            ? 'Konfirmasi visual saja.'
                            : 'Pratinjau form.'
                    "
                >
                    Field dan aksi hanya untuk memvisualisasikan UI. Tidak ada
                    perubahan ke website atau database.
                </ErpNoticeBanner>

                <div v-if="drawer.fields.length" class="drawer-fields">
                    <ErpFormField
                        v-for="(field, idx) in drawer.fields"
                        :key="`drawer-field-${idx}`"
                        :field="field"
                        name-prefix="drawer-form"
                        :model-value="fieldValues[field.label] ?? ''"
                        @update:model-value="
                            (val) => (fieldValues[field.label] = val)
                        "
                    />
                </div>
                <p v-else class="card-desc" style="margin-top: 13px">
                    Detail mengikuti modul yang dipilih. Tidak ada data akun
                    atau transaksi aktual yang ditampilkan.
                </p>

                <div class="form-actions">
                    <button
                        type="button"
                        class="button primary"
                        @click="
                            emit(
                                'confirmAction',
                                drawer.isDelete
                                    ? 'Hapus demo'
                                    : 'Mode demonstrasi',
                            )
                        "
                    >
                        {{
                            drawer.isDelete
                                ? 'Konfirmasi (demo)'
                                : 'Simpan (demo)'
                        }}
                    </button>
                    <button type="button" class="button" @click="emit('close')">
                        Batal
                    </button>
                </div>
            </div>
        </aside>
    </dialog>
</template>
