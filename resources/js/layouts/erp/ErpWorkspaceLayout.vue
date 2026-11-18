<script setup lang="ts">
import ErpDetailDrawer from '@/components/erp/ErpDetailDrawer.vue';
import ErpFooter from '@/components/erp/ErpFooter.vue';
import ErpSidebar from '@/components/erp/ErpSidebar.vue';
import ErpTeamChat from '@/components/erp/ErpTeamChat.vue';
import ErpToast from '@/components/erp/ErpToast.vue';
import ErpTopbar from '@/components/erp/ErpTopbar.vue';
import type {
    ErpDrawerState,
    ErpModuleManifest,
    ErpPageKey,
    ErpToastState,
} from '@/types/erp';

defineProps<{
    modules: ErpModuleManifest[];
    currentPageKey: ErpPageKey;
    crumbTitle: string;
    moduleTitle?: string;
    isDark: boolean;
    isMobileMenuOpen: boolean;
    isChatOpen: boolean;
    drawer: ErpDrawerState;
    toast: ErpToastState;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
    toggleMobileMenu: [];
    closeMobileMenu: [];
    toggleTheme: [];
    closeDrawer: [];
    confirmDrawer: [actionLabel: string];
    toggleChat: [];
    closeChat: [];
    sendChat: [];
}>();
</script>

<template>
    <div class="erp-root" :class="{ 'theme-dark': isDark }">
        <div class="app-shell">
            <ErpSidebar
                :modules="modules"
                :current-page-key="currentPageKey"
                :is-open-mobile="isMobileMenuOpen"
                @navigate="(page) => emit('navigate', page)"
                @action="(act) => emit('action', act)"
                @close-mobile="emit('closeMobileMenu')"
            />

            <main class="main-area">
                <ErpTopbar
                    :crumb-title="crumbTitle"
                    :module-title="moduleTitle"
                    :is-dark="isDark"
                    @toggle-mobile-menu="emit('toggleMobileMenu')"
                    @toggle-theme="emit('toggleTheme')"
                    @notify-action="(act) => emit('action', act)"
                />

                <section
                    id="pageContent"
                    class="page-content"
                    aria-live="polite"
                >
                    <slot />
                </section>

                <ErpFooter />
            </main>
        </div>

        <ErpDetailDrawer
            :drawer="drawer"
            @close="emit('closeDrawer')"
            @confirm-action="(act) => emit('confirmDrawer', act)"
        />

        <ErpTeamChat
            :is-open="isChatOpen"
            @toggle="emit('toggleChat')"
            @close="emit('closeChat')"
            @send="emit('sendChat')"
        />

        <ErpToast :toast="toast" />
    </div>
</template>
