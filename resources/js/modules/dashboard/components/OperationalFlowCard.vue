<script setup lang="ts">
import ErpStatusBadge from '@/components/erp/ErpStatusBadge.vue';
import { DASHBOARD_FLOW_NODES } from '@/modules/dashboard/data';
import type { ErpPageKey } from '@/types/erp';

const emit = defineEmits<{
    navigate: [pageKey: ErpPageKey];
}>();
</script>

<template>
    <section class="card">
        <div class="card-header">
            <div>
                <h2 class="card-title">Monitoring proses operasional</h2>
                <p class="card-desc">
                    Urutan lintas modul dengan jalur Fresh dan Frozen tetap
                    terpisah.
                </p>
            </div>
            <ErpStatusBadge variant="info" label="Ringkasan" />
        </div>

        <div class="flow-track">
            <button
                v-for="node in DASHBOARD_FLOW_NODES"
                :key="node.step"
                type="button"
                class="flow-node"
                :class="{
                    done: node.state === 'done',
                    active: node.state === 'active',
                }"
                @click="emit('navigate', node.targetPage)"
            >
                <span class="flow-step">{{ node.step }}</span>
                <strong>{{ node.title }}</strong>
                <small>{{ node.subtitle }}</small>
            </button>
        </div>

        <div class="flow-note">
            <span aria-hidden="true">✦</span>
            <span>
                <b>Alur yang dipertahankan:</b> PO → schedule target → kebutuhan
                material → tally fresh/frozen → distribusi → SPK → hasil proses
                / reject / retur → Finish Good → loading &amp; shipping.
            </span>
        </div>
    </section>
</template>
