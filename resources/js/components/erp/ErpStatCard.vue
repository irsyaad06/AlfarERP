<script setup lang="ts">
withDefaults(
    defineProps<{
        label: string;
        value: string;
        description: string;
        icon?: string;
    }>(),
    {
        icon: '◈',
    },
);
</script>

<template>
    <article class="stat-card">
        <div class="stat-top">
            <span class="stat-label">{{ label }}</span>
            <span class="stat-icon" aria-hidden="true">{{ icon }}</span>
        </div>
        <div class="stat-value">{{ value }}</div>
        <div class="stat-foot">{{ description }}</div>
    </article>
</template>
