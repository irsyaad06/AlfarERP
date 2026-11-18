<script setup lang="ts">
import type { ErpToastState } from '@/types/erp';

defineProps<{
    toast: ErpToastState;
}>();
</script>

<template>
    <div
        id="toast"
        class="toast"
        :class="{ show: toast.isVisible }"
        role="status"
        aria-live="polite"
    >
        {{ toast.message }}
    </div>
</template>
