<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useAppearance } from '@/composables/useAppearance';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();

const { resolvedAppearance, updateAppearance } = useAppearance();
const isDark = computed(() => resolvedAppearance.value === 'dark');

function toggleTheme(): void {
    updateAppearance(isDark.value ? 'light' : 'dark');
}

const operationalHighlights = [
    {
        step: '01',
        title: 'PO & PPIC Terjadwal',
        desc: 'Sinkronisasi pesanan, schedule target, dan proyeksi kebutuhan bahan baku.',
    },
    {
        step: '02',
        title: 'Tally QC Fresh & Frozen',
        desc: 'Pemisahan jalur penerimaan kadar air fresh, gudang frozen, serta rekonsiliasi distribusi.',
    },
    {
        step: '03',
        title: 'Eksekusi SPK & Packing',
        desc: 'Monitoring realisasi gramasi, chilling, ABF2, finish good, hingga loading & surat jalan.',
    },
];

const roleBadges = [
    'Admin',
    'Manager',
    'PPIC',
    'Produksi',
    'Gudang',
    'QC',
    'Finance',
    'Purchase',
];
</script>

<template>
    <div class="erp-root erp-auth-shell" :class="{ 'theme-dark': isDark }">
        <!-- Left Hero Showcase Panel -->
        <aside
            class="erp-auth-showcase"
            aria-label="Ringkasan platform Alfar ERP"
        >
            <div class="erp-auth-glow erp-auth-glow-top" aria-hidden="true" />
            <div
                class="erp-auth-glow erp-auth-glow-bottom"
                aria-hidden="true"
            />

            <div class="erp-auth-showcase-top">
                <Link :href="home()" class="brand erp-auth-brand">
                    <span class="brand-mark">A</span>
                    <span>
                        <b>ALFAR <i>ERP</i></b>
                        <small>Butcher Operations System</small>
                    </span>
                </Link>

                <div class="erp-auth-pill">
                    <span class="workspace-dot" />
                    <span>Monolith Modular · Operations Workspace</span>
                </div>
            </div>

            <div class="erp-auth-hero">
                <span class="erp-auth-kicker">
                    END-TO-END BUTCHER OPERATIONS
                </span>
                <h2>
                    Kendalikan Alur Penerimaan BB, Produksi SPK, hingga Shipping
                    dalam Satu Workspace.
                </h2>
                <p>
                    Dirancang khusus untuk operasional Alfar Butcher dengan
                    pemisahan jalur Fresh &amp; Frozen, kontrol stok real-time,
                    dan manajemen otoritas lintas divisi.
                </p>

                <div class="erp-auth-steps">
                    <article
                        v-for="item in operationalHighlights"
                        :key="item.step"
                        class="erp-auth-step-card"
                    >
                        <span class="erp-auth-step-num">{{ item.step }}</span>
                        <div>
                            <strong>{{ item.title }}</strong>
                            <small>{{ item.desc }}</small>
                        </div>
                    </article>
                </div>

                <div class="erp-auth-roles">
                    <span class="erp-auth-roles-label">
                        Otoritas Multi-Divisi:
                    </span>
                    <div class="erp-auth-role-tags">
                        <span v-for="role in roleBadges" :key="role">
                            {{ role }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="erp-auth-showcase-foot">
                <span>© 2026 Alfar Butcher ERP · Modular Monolith</span>
                <Link :href="home()" class="erp-auth-preview-link">
                    Buka Prototype Workspace <span>→</span>
                </Link>
            </div>
        </aside>

        <!-- Right Form Panel -->
        <main class="erp-auth-main">
            <div class="erp-auth-topbar">
                <Link :href="home()" class="erp-auth-mobile-brand">
                    <span class="brand-mark">A</span>
                    <span>
                        <b>ALFAR <i>ERP</i></b>
                        <small>Butcher Operations</small>
                    </span>
                </Link>

                <div class="erp-auth-top-actions">
                    <Link :href="home()" class="button soft">
                        ◫ Pratinjau Workspace
                    </Link>
                    <button
                        type="button"
                        class="icon-button"
                        :aria-label="
                            isDark
                                ? 'Aktifkan tema terang'
                                : 'Aktifkan tema gelap'
                        "
                        @click="toggleTheme"
                    >
                        {{ isDark ? '☀' : '☾' }}
                    </button>
                </div>
            </div>

            <div class="erp-auth-card-wrap">
                <section class="card erp-auth-card">
                    <div class="erp-auth-card-head">
                        <div class="erp-auth-badge-row">
                            <span class="eyebrow"
                                >OTORITAS &amp; AKSES SISTEM</span
                            >
                            <span class="status info">9 Modul Aktif</span>
                        </div>
                        <h1 v-if="title" class="erp-auth-title">
                            {{ title }}
                        </h1>
                        <p v-if="description" class="erp-auth-desc">
                            {{ description }}
                        </p>
                    </div>

                    <slot />
                </section>

                <p class="erp-auth-help-foot">
                    Mengalami kendala akses akun divisi? Hubungi
                    <b>Administrator IT / Panel Otoritas Alfar Butcher</b>.
                </p>
            </div>
        </main>
    </div>
</template>
