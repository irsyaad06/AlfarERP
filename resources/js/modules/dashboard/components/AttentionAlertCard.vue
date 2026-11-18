<script setup lang="ts">
import { DASHBOARD_ATTENTION_ITEMS } from '@/modules/dashboard/data';
import type { ErpPageKey } from '@/types/erp';

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
}>();
</script>

<template>
    <section class="card">
        <div class="card-header">
            <div>
                <h2 class="card-title">Perlu ditinjau</h2>
                <p class="card-desc">
                    Peringatan berdasarkan status, bukan angka hardcode.
                </p>
            </div>
        </div>

        <div class="attention-list">
            <div
                v-for="item in DASHBOARD_ATTENTION_ITEMS"
                :key="item.targetPage"
                class="attention-item"
            >
                <i
                    class="attention-marker"
                    :class="{ blue: item.variant === 'blue' }"
                    aria-hidden="true"
                />
                <div>
                    <strong>{{ item.title }}</strong>
                    <small>{{ item.subtitle }}</small>
                </div>
                <button
                    type="button"
                    class="row-action"
                    @click="emit('navigate', item.targetPage)"
                >
                    Buka
                </button>
            </div>
        </div>
    </section>
</template>
