<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: 'audit' | 'warning' | 'illustration';
        title?: string;
        footer?: boolean;
    }>(),
    {
        variant: 'audit',
        title: '',
        footer: false,
    },
);
</script>

<template>
    <div
        v-if="variant === 'illustration'"
        class="illustration-note"
        :class="{ 'footer-note': footer }"
    >
        <slot />
    </div>
    <div
        v-else
        class="notice-note"
        :class="{ 'warning-note': variant === 'warning' }"
    >
        <b v-if="title">{{ title }}</b>
        <template v-if="title">{{ ' ' }}</template>
        <slot />
    </div>
</template>
