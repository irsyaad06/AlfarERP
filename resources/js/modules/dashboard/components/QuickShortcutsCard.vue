<script setup lang="ts">
import { DASHBOARD_SHORTCUTS } from '@/modules/dashboard/data';
import type { ErpPageKey } from '@/types/erp';

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
}>();
</script>

<template>
    <section class="card">
        <div class="card-header">
            <div>
                <h2 class="card-title">Pintu akses cepat</h2>
                <p class="card-desc">Akses modul yang sering dipakai.</p>
            </div>
        </div>

        <div class="shortcut-list">
            <button
                v-for="item in DASHBOARD_SHORTCUTS"
                :key="item.targetPage"
                type="button"
                @click="emit('navigate', item.targetPage)"
            >
                {{ item.label }} <span aria-hidden="true">›</span>
            </button>
        </div>
    </section>
</template>
