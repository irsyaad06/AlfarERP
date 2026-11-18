<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { home, register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Masuk ke Alfar Butcher ERP',
        description:
            'Gunakan kredensial akun divisi Anda untuk mengakses modul operasional.',
    },
});

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const emailValue = ref('');
const selectedPreset = ref('');

const demoAccounts = [
    {
        role: 'Super Admin',
        email: 'admin@alfarbutcher.test',
        module: 'Semua Modul & Otoritas',
    },
    {
        role: 'PPIC & Produksi',
        email: 'ppic.produksi@alfarbutcher.test',
        module: 'Schedule & SPK',
    },
    {
        role: 'Gudang & Tally QC',
        email: 'qc.gudang@alfarbutcher.test',
        module: 'Fresh, Frozen & Material',
    },
];

function applyDemoAccount(email: string, role: string): void {
    emailValue.value = email;
    selectedPreset.value = role;
}
</script>

<template>
    <Head title="Masuk — Alfar Butcher ERP" />

    <div v-if="status" class="notice-note" role="status">
        {{ status }}
    </div>

    <div class="erp-auth-presets">
        <div class="erp-auth-presets-head">
            <span>Pilih Cepat Akun Demo Divisi</span>
            <small>Klik untuk mengisi email otomatis</small>
        </div>
        <div class="erp-auth-preset-grid">
            <button
                v-for="item in demoAccounts"
                :key="item.role"
                type="button"
                class="erp-auth-preset-btn"
                :class="{ active: selectedPreset === item.role }"
                @click="applyDemoAccount(item.email, item.role)"
            >
                <strong>{{ item.role }}</strong>
                <small>{{ item.module }}</small>
            </button>
        </div>
    </div>

    <Form
        v-bind="store.form()"
        :reset-on-success="['password']"
        v-slot="{ errors, processing }"
        class="erp-auth-form"
    >
        <div class="erp-auth-fields">
            <div class="erp-auth-field-group">
                <Label for="email" class="erp-auth-label">
                    Email / Akun Karyawan
                </Label>
                <Input
                    id="email"
                    v-model="emailValue"
                    type="email"
                    name="email"
                    required
                    v-focus
                    :tabindex="1"
                    autocomplete="username"
                    spellcheck="false"
                    enterkeyhint="next"
                    placeholder="nama.divisi@alfarbutcher.com"
                    class="erp-auth-input"
                />
                <InputError :message="errors.email" />
            </div>

            <div class="erp-auth-field-group">
                <div class="erp-auth-label-row">
                    <Label for="password" class="erp-auth-label">
                        Password
                    </Label>
                    <TextLink
                        v-if="canResetPassword"
                        :href="request()"
                        class="erp-auth-forgot"
                        :tabindex="5"
                    >
                        Lupa password?
                    </TextLink>
                </div>
                <PasswordInput
                    id="password"
                    name="password"
                    required
                    :tabindex="2"
                    autocomplete="current-password"
                    enterkeyhint="done"
                    placeholder="Masukkan password akun"
                    class="erp-auth-input"
                />
                <InputError :message="errors.password" />
            </div>

            <div class="erp-auth-remember-row">
                <Label for="remember" class="erp-auth-remember-label">
                    <Checkbox id="remember" name="remember" :tabindex="3" />
                    <span>Ingat sesi saya di perangkat operasional ini</span>
                </Label>
            </div>

            <button
                type="submit"
                class="button primary erp-auth-submit"
                :tabindex="4"
                :disabled="processing"
                data-test="login-button"
            >
                <Spinner v-if="processing" />
                <span>Masuk ke Workspace ERP</span>
                <span aria-hidden="true">→</span>
            </button>
        </div>

        <div class="erp-auth-divider">
            <span>atau jelajahi tanpa autentikasi</span>
        </div>

        <Link :href="home()" class="button soft erp-auth-demo-cta">
            ◫ Buka Prototype UI/UX Langsung (Mode Demo)
        </Link>

        <div class="erp-auth-footer-links">
            Belum memiliki akun karyawan?
            <TextLink :href="register()" :tabindex="6">
                Daftar akun baru
            </TextLink>
        </div>
    </Form>
</template>
