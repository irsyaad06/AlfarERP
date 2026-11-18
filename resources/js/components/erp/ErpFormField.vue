<script setup lang="ts">
import { computed } from 'vue';
import { parseErpField } from '@/composables/erp/useErpFieldParser';
import type { ErpFieldInput } from '@/types/erp';

const props = defineProps<{
    field: ErpFieldInput;
    modelValue?: string;
    namePrefix?: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const parsed = computed(() => parseErpField(props.field));

const selectPlaceholder = computed(() => {
    const firstOpt = parsed.value.options?.[0] ?? '';
    return firstOpt.startsWith('Pilih') ? firstOpt : 'Semua / pilih';
});

const selectOptions = computed(() => {
    return (parsed.value.options ?? []).filter(
        (opt) => !opt.startsWith('Pilih'),
    );
});

const radioName = computed(() => {
    return `${props.namePrefix ?? 'erp-field'}-${parsed.value.label}`;
});

function onInput(event: Event): void {
    const target = event.target as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
    emit('update:modelValue', target.value);
}
</script>

<template>
    <label v-if="parsed.type === 'select'" class="field">
        <span>{{ parsed.label }}</span>
        <select :value="modelValue ?? ''" @change="onInput">
            <option value="">{{ selectPlaceholder }}</option>
            <option
                v-for="option in selectOptions"
                :key="option"
                :value="option"
            >
                {{ option }}
            </option>
        </select>
    </label>

    <fieldset v-else-if="parsed.type === 'radio'" class="field radio-field">
        <legend>{{ parsed.label }}</legend>
        <div>
            <label v-for="option in parsed.options ?? []" :key="option">
                <input
                    type="radio"
                    :name="radioName"
                    :value="option"
                    :checked="modelValue === option"
                    @change="onInput"
                />
                {{ option }}
            </label>
        </div>
    </fieldset>

    <label v-else-if="parsed.type === 'textarea'" class="field">
        <span>{{ parsed.label }}</span>
        <textarea
            :placeholder="parsed.placeholder"
            :value="modelValue ?? ''"
            @input="onInput"
        />
    </label>

    <label v-else-if="parsed.type === 'file'" class="field">
        <span>{{ parsed.label }}</span>
        <input type="file" disabled :aria-label="parsed.label" />
    </label>

    <label v-else class="field">
        <span>{{ parsed.label }}</span>
        <input
            :type="parsed.type === 'readonly' ? 'text' : parsed.type"
            :placeholder="parsed.placeholder"
            :readonly="parsed.type === 'readonly'"
            :value="
                parsed.type === 'readonly'
                    ? 'Dibuat sistem'
                    : (modelValue ?? '')
            "
            @input="onInput"
        />
    </label>
</template>
