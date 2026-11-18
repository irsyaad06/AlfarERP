<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import ErpFormField from '@/components/erp/ErpFormField.vue';
import ErpStatusBadge from '@/components/erp/ErpStatusBadge.vue';
import { parseErpField } from '@/composables/erp/useErpFieldParser';
import type { ErpFieldInput } from '@/types/erp';

const props = withDefaults(
    defineProps<{
        fields: ErpFieldInput[];
        actions?: string[];
        formTitle?: string;
        pageKey: string;
    }>(),
    {
        actions: () => [],
        formTitle: 'Form / detail proses',
    },
);

const emit = defineEmits<{
    submitAction: [actionName: string];
}>();

const formValues = reactive<Record<string, string>>({});

const formActions = computed(() => {
    return props.actions
        .filter((action) =>
            /^(Simpan|Daftarkan|Eksekusi|Perbarui)/i.test(action),
        )
        .slice(0, 1);
});

function updateField(field: ErpFieldInput, value: string): void {
    const label = parseErpField(field).label;
    formValues[label] = value;
}

watch(
    () => props.pageKey,
    () => {
        Object.keys(formValues).forEach((key) => {
            formValues[key] = '';
        });
    },
);
</script>

<template>
    <section class="card form-card">
        <div class="card-header">
            <div>
                <h2 class="card-title">{{ formTitle }}</h2>
                <p class="card-desc">
                    Field mengikuti fungsi halaman; tindakan di prototype tidak
                    menyimpan data.
                </p>
            </div>
            <ErpStatusBadge variant="info" label="Mode demonstrasi" />
        </div>

        <div class="field-grid">
            <ErpFormField
                v-for="(field, idx) in fields"
                :key="`${pageKey}-field-${idx}`"
                :field="field"
                :name-prefix="`${pageKey}-form`"
                :model-value="formValues[parseErpField(field).label] ?? ''"
                @update:model-value="(val) => updateField(field, val)"
            />
        </div>

        <div v-if="formActions.length" class="form-actions">
            <button
                v-for="(action, idx) in formActions"
                :key="action"
                type="button"
                class="button"
                :class="{ primary: idx === 0 }"
                @click="emit('submitAction', action)"
            >
                {{ action }}
            </button>
        </div>
    </section>
</template>
