<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    actions: string[];
}>();

const emit = defineEmits<{
    action: [actionName: string];
}>();

const extraActions = computed(() => {
    const primary = props.actions.find((action) =>
        /Tambah|Buat|Daftarkan|Jadwalkan/.test(action),
    );
    const formAction = props.actions.find((action) =>
        /^(Simpan|Daftarkan|Eksekusi|Perbarui)/i.test(action),
    );
    return props.actions.filter(
        (action) => action !== primary && action !== formAction,
    );
});
</script>

<template>
    <section v-if="extraActions.length" class="action-strip card">
        <span class="card-desc">Aksi tambahan</span>
        <div>
            <button
                v-for="action in extraActions"
                :key="action"
                type="button"
                class="button"
                @click="emit('action', action)"
            >
                {{ action }}
            </button>
        </div>
    </section>
</template>
