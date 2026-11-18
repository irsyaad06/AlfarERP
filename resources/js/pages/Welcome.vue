<script setup lang="ts">
import Workspace from '@/pages/erp/Workspace.vue';

withDefaults(
    defineProps<{
        initialPage?: string;
        initialModule?: string;
    }>(),
    {
        initialPage: 'dashboard',
        initialModule: 'dashboard',
    },
);
</script>

<template>
    <Workspace :initial-page="initialPage" :initial-module="initialModule" />
</template>
