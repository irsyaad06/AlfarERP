<script setup lang="ts">
import ErpStandardPageView from '@/components/erp/ErpStandardPageView.vue';
import UsersPage from '@/modules/access/pages/UsersPage.vue';
import type { ErpPageKey, ErpPageSchema } from '@/types/erp';

defineProps<{
    schema: ErpPageSchema;
    currentPageKey: ErpPageKey;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
    rowAction: [actionName: string, row: string[]];
}>();
</script>

<template>
    <UsersPage
        v-if="currentPageKey === 'users'"
        :schema="schema"
        :current-page-key="currentPageKey"
        @navigate="(page) => emit('navigate', page)"
        @action="(act) => emit('action', act)"
        @row-action="(act, row) => emit('rowAction', act, row)"
    />
    <ErpStandardPageView
        v-else
        :schema="schema"
        :current-page-key="currentPageKey"
        @navigate="(page) => emit('navigate', page)"
        @action="(act) => emit('action', act)"
        @row-action="(act, row) => emit('rowAction', act, row)"
    />
</template>
