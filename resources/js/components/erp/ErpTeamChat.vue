<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    isOpen: boolean;
}>();

const emit = defineEmits<{
    toggle: [];
    close: [];
    send: [recipient: string, draft: string];
}>();

const recipient = ref('Semua · Broadcast / All');
const draft = ref('');

function handleSend(): void {
    emit('send', recipient.value, draft.value);
    draft.value = '';
}
</script>

<template>
    <button
        id="chatLauncher"
        type="button"
        class="chat-launcher"
        aria-label="Buka chat tim"
        :aria-expanded="isOpen"
        @click="emit('toggle')"
    >
        ◉ <span>Chat Tim</span><i>4</i>
    </button>

    <section
        id="chatPanel"
        class="chat-panel"
        :class="{ open: isOpen }"
        aria-label="Chat Alfar Butcher"
    >
        <header>
            <div>
                <b>Alfar Butcher Live</b>
                <small>Chat tim operasional</small>
            </div>
            <button
                id="chatClose"
                type="button"
                aria-label="Tutup chat"
                @click="emit('close')"
            >
                ×
            </button>
        </header>

        <div class="chat-empty">
            Gunakan chat tim untuk komunikasi internal lintas divisi.
        </div>

        <label>
            Kirim Ke
            <select id="chatRecipient" v-model="recipient">
                <option>Semua · Broadcast / All</option>
                <option>Pengguna 1 · PPIC & Produksi</option>
                <option>Pengguna 2 · Gudang & QC</option>
            </select>
        </label>

        <textarea
            id="chatDraft"
            v-model="draft"
            placeholder="Tulis pesan…"
            aria-label="Tulis pesan"
        />

        <button
            id="chatSend"
            type="button"
            class="button primary"
            @click="handleSend"
        >
            Kirim Pesan
        </button>
    </section>
</template>
