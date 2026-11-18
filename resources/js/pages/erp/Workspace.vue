<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { useErpWorkspace } from '@/composables/erp/useErpWorkspace';
import ErpWorkspaceLayout from '@/layouts/erp/ErpWorkspaceLayout.vue';
import type { ErpPageKey } from '@/types/erp';

const props = withDefaults(
    defineProps<{
        initialPage?: string;
        initialModule?: string;
    }>(),
    {
        initialPage: 'dashboard',
        initialModule: 'dashboard',
    },
);

const {
    modules,
    currentPageKey,
    currentSchema,
    currentModule,
    currentComponent,
    isDark,
    isMobileMenuOpen,
    isChatOpen,
    drawer,
    toast,
    notify,
    closeDrawer,
    navigateToPage,
    handleAction,
    handleRowAction,
    toggleTheme,
} = useErpWorkspace(props.initialPage);
</script>

<template>
    <Head :title="`${currentSchema.title} — Alfar ERP`" />

    <ErpWorkspaceLayout
        :modules="modules"
        :current-page-key="currentPageKey"
        :crumb-title="currentSchema.title"
        :module-title="currentModule.groupLabel"
        :is-dark="isDark"
        :is-mobile-menu-open="isMobileMenuOpen"
        :is-chat-open="isChatOpen"
        :drawer="drawer"
        :toast="toast"
        @navigate="(page) => navigateToPage(page)"
        @action="(act) => handleAction(act)"
        @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen"
        @close-mobile-menu="isMobileMenuOpen = false"
        @toggle-theme="toggleTheme"
        @close-drawer="closeDrawer"
        @confirm-drawer="(act) => notify(act)"
        @toggle-chat="isChatOpen = !isChatOpen"
        @close-chat="isChatOpen = false"
        @send-chat="notify('Chat hanya tampilan demo, pesan tidak dikirim')"
    >
        <component
            :is="currentComponent"
            :key="currentPageKey"
            :schema="currentSchema"
            :current-page-key="currentPageKey"
            @navigate="(page: ErpPageKey) => navigateToPage(page)"
            @action="(act: string) => handleAction(act)"
            @row-action="(act: string) => handleRowAction(act)"
        />
    </ErpWorkspaceLayout>
</template>
