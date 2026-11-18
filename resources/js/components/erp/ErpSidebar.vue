<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ErpModuleManifest, ErpPageKey } from '@/types/erp';

const props = defineProps<{
    modules: ErpModuleManifest[];
    currentPageKey: ErpPageKey;
    isOpenMobile: boolean;
}>();

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
    action: [actionName: string];
    closeMobile: [];
}>();

const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);
const openGroupOverrides = ref<Record<string, boolean>>({
    orders: true,
});

const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());

const isDashboardVisible = computed(() => {
    if (!normalizedQuery.value) {
        return true;
    }
    return 'dashboard'.includes(normalizedQuery.value);
});

const groupedModules = computed(() => {
    return props.modules.filter((m) => !m.single);
});

const filteredGroups = computed(() => {
    const q = normalizedQuery.value;

    return groupedModules.value
        .map((group) => {
            const groupMatch = group.groupLabel.toLowerCase().includes(q);
            const matchingItems = q
                ? group.navItems.filter(
                      (item) =>
                          groupMatch || item.label.toLowerCase().includes(q),
                  )
                : group.navItems;

            const isVisible = !q || groupMatch || matchingItems.length > 0;

            return {
                ...group,
                visibleItems: matchingItems,
                isVisible,
                isOpen: q
                    ? isVisible
                    : (openGroupOverrides.value[group.key] ??
                      group.navItems.some(
                          (item) => item.page === props.currentPageKey,
                      ) ??
                      Boolean(group.defaultOpen)),
            };
        })
        .filter((group) => group.isVisible);
});

const hasAnyMatch = computed(() => {
    return isDashboardVisible.value || filteredGroups.value.length > 0;
});

function clearSearch(): void {
    searchQuery.value = '';
    searchInputRef.value?.focus();
}

function handleGroupToggle(moduleKey: string, event: Event): void {
    if (normalizedQuery.value) {
        return;
    }
    const detailsEl = event.target as HTMLDetailsElement;
    openGroupOverrides.value[moduleKey] = detailsEl.open;
}

function selectPage(pageKey: ErpPageKey, moduleKey?: string): void {
    if (moduleKey) {
        openGroupOverrides.value[moduleKey] = true;
    }
    emit('navigate', pageKey);
    emit('closeMobile');
}
</script>

<template>
    <aside
        id="sidebar"
        class="sidebar"
        :class="{ open: isOpenMobile }"
        aria-label="Sidebar Alfar ERP"
    >
        <a
            class="brand"
            href="#dashboard"
            aria-label="Alfar ERP beranda"
            @click.prevent="selectPage('dashboard')"
        >
            <span class="brand-mark">A</span>
            <span>
                <b>ALFAR <i>ERP</i></b>
                <small>Butcher Operations</small>
            </span>
        </a>

        <div class="workspace">
            <span class="workspace-dot" />
            <span>Operations workspace</span>
            <span class="chevron" aria-hidden="true">⌄</span>
        </div>

        <nav id="workspaceNav" class="primary-nav" aria-label="Navigasi modul">
            <div
                class="nav-search-wrap"
                :class="{ 'has-value': Boolean(normalizedQuery) }"
            >
                <svg
                    class="nav-search-icon"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <circle cx="8.8" cy="8.8" r="5.8" />
                    <path d="m13.2 13.2 4 4" />
                </svg>
                <input
                    ref="searchInputRef"
                    v-model="searchQuery"
                    type="text"
                    class="nav-search"
                    autocomplete="off"
                    placeholder="Cari menu atau modul"
                    aria-label="Cari menu atau modul"
                />
                <button
                    v-show="Boolean(normalizedQuery)"
                    type="button"
                    class="nav-search-clear"
                    aria-label="Hapus pencarian"
                    @click="clearSearch"
                >
                    ×
                </button>
            </div>

            <div
                v-if="normalizedQuery && !hasAnyMatch"
                class="nav-search-empty"
                role="status"
            >
                Menu tidak ditemukan
            </div>

            <button
                v-show="isDashboardVisible"
                type="button"
                class="nav-item"
                :class="{ active: currentPageKey === 'dashboard' }"
                @click="selectPage('dashboard')"
            >
                <span class="nav-icon" aria-hidden="true">◫</span>
                <span>Dashboard</span>
            </button>

            <details
                v-for="group in filteredGroups"
                :key="group.key"
                class="nav-group"
                :open="group.isOpen"
                @toggle="handleGroupToggle(group.key, $event)"
            >
                <summary>
                    <span class="nav-icon" aria-hidden="true">
                        {{ group.icon }}
                    </span>
                    <span>{{ group.groupLabel }}</span>
                    <span class="group-caret" aria-hidden="true">⌄</span>
                </summary>

                <div class="nav-children">
                    <button
                        v-for="item in group.visibleItems"
                        :key="item.page"
                        type="button"
                        class="nav-item"
                        :class="{ active: currentPageKey === item.page }"
                        @click="selectPage(item.page, group.key)"
                    >
                        <span class="nav-bullet" />
                        <span>{{ item.label }}</span>
                    </button>
                </div>
            </details>
        </nav>

        <div class="sidebar-bottom">
            <div class="help-card">
                <span class="help-spark" aria-hidden="true">✦</span>
                <b>Butuh bantuan?</b>
                <small>Panduan proses Alfar Butcher</small>
                <button type="button" @click="selectPage('guide')">
                    Buka panduan <span>↗</span>
                </button>
            </div>

            <button
                type="button"
                class="profile"
                @click="selectPage('profile', 'access')"
            >
                <span class="avatar">SA</span>
                <span class="profile-copy">
                    <b>Pengaturan akun</b>
                    <small>Profil & keamanan</small>
                </span>
                <span class="more" aria-hidden="true">···</span>
            </button>

            <button
                type="button"
                class="logout-button"
                @click="emit('action', 'Keluar Sistem')"
            >
                ↪ Keluar Sistem
            </button>
        </div>
    </aside>

    <div
        id="scrim"
        class="mobile-scrim"
        :class="{ show: isOpenMobile }"
        @click="emit('closeMobile')"
    />
</template>
