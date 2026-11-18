<script setup lang="ts">
defineProps<{
    crumbTitle: string;
    moduleTitle?: string;
    isDark: boolean;
    currentDateLabel?: string;
}>();

const emit = defineEmits<{
    toggleMobileMenu: [];
    toggleTheme: [];
    notifyAction: [action: string];
}>();
</script>

<template>
    <header class="topbar">
        <div class="topbar-left">
            <button
                id="menuToggle"
                type="button"
                class="icon-button mobile-menu"
                aria-label="Buka menu"
                @click="emit('toggleMobileMenu')"
            >
                ☰
            </button>
            <nav class="breadcrumbs" aria-label="Breadcrumb">
                <span>Alfar ERP</span>
                <template v-if="moduleTitle && moduleTitle !== crumbTitle">
                    <i aria-hidden="true">/</i>
                    <span>{{ moduleTitle }}</span>
                </template>
                <i aria-hidden="true">/</i>
                <b id="crumbTitle">{{ crumbTitle }}</b>
            </nav>
        </div>

        <div class="topbar-actions">
            <div class="top-date">
                <span class="calendar-icon" aria-hidden="true">▦</span>
                <span>{{ currentDateLabel || '18 November 2026' }}</span>
            </div>

            <button
                id="themeToggle"
                type="button"
                class="icon-button"
                :aria-label="
                    isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'
                "
                @click="emit('toggleTheme')"
            >
                {{ isDark ? '☀' : '☾' }}
            </button>

            <span class="connection-state">
                <i aria-hidden="true" /> Koneksi
            </span>

            <button
                type="button"
                class="icon-button notification"
                aria-label="Notifikasi"
                @click="emit('notifyAction', 'Notifikasi sistem')"
            >
                ♧<i aria-hidden="true" />
            </button>

            <span class="top-avatar" title="Super Admin">SA</span>
        </div>
    </header>
</template>
