<script setup lang="ts">
import { DASHBOARD_PRODUCTION_STAGES } from '@/modules/dashboard/data';
import type { ErpPageKey } from '@/types/erp';

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
}>();
</script>

<template>
    <section class="card">
        <div class="card-header">
            <div>
                <h2 class="card-title">Progres produksi per tahap</h2>
                <p class="card-desc">
                    Metrik dari dashboard aktual: target, gramasi-chilling,
                    gramasi-FG, pack, Finish Good, dan BB.
                </p>
            </div>
            <button
                type="button"
                class="text-link"
                @click="emit('navigate', 'productionDisplay')"
            >
                Buka monitoring →
            </button>
        </div>

        <div class="stage-grid">
            <div
                v-for="stage in DASHBOARD_PRODUCTION_STAGES"
                :key="stage.label"
            >
                <span>{{ stage.label }}</span>
                <b>{{ stage.value }}</b>
                <i>{{ stage.unit }}</i>
            </div>
        </div>
    </section>
</template>
