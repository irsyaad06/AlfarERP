<script setup lang="ts">
import { computed } from 'vue';
import type { ErpPageKey, ErpPageSchema } from '@/types/erp';

const props = defineProps<{
    schema: ErpPageSchema;
    currentPageKey: ErpPageKey;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
}>();

const primaryAction = computed(() => {
    return (props.schema.actions ?? []).find((action) =>
        /Tambah|Buat|Daftarkan|Jadwalkan/.test(action),
    );
});

const isAddUserRedirect = computed(() => {
    return (
        props.currentPageKey === 'users' &&
        primaryAction.value === 'Tambah Pengguna Baru'
    );
});

const showBackToUsers = computed(() => {
    return (
        props.currentPageKey === 'userAdd' ||
        props.currentPageKey === 'userPassword'
    );
});

function handlePrimaryClick(): void {
    if (!primaryAction.value) {
        return;
    }

    if (isAddUserRedirect.value) {
        emit('navigate', 'userAdd');
        return;
    }

    emit('action', primaryAction.value);
}
</script>

<template>
    <div class="page-title-row">
        <div>
            <span class="eyebrow">{{ schema.module || 'Alfar ERP' }}</span>
            <h1 class="page-title">{{ schema.title }}</h1>
            <p class="page-subtitle">{{ schema.desc || '' }}</p>
        </div>

        <div class="title-actions">
            <button
                v-if="showBackToUsers"
                type="button"
                class="button"
                @click="emit('navigate', 'users')"
            >
                ← Kembali ke Manajemen User
            </button>

            <button
                v-if="primaryAction"
                type="button"
                class="button primary"
                @click="handlePrimaryClick"
            >
                ＋ {{ primaryAction }}
            </button>
        </div>
    </div>
</template>
