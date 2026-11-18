<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: 'success' | 'warn' | 'info' | 'muted' | 'danger';
        label?: string;
    }>(),
    {
        variant: 'success',
        label: '',
    },
);
</script>

<template>
    <span
        class="status"
        :class="{
            warn: variant === 'warn',
            info: variant === 'info',
            muted: variant === 'muted',
            danger: variant === 'danger',
        }"
    >
        <slot>{{ label }}</slot>
    </span>
</template>
