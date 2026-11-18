import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { parseErpFields } from '@/composables/erp/useErpFieldParser';
import { useAppearance } from '@/composables/useAppearance';
import {
    ERP_MODULES,
    getErpModuleForPage,
    getErpPageComponent,
    getErpPageSchema,
    isValidErpPageKey,
} from '@/modules/registry';
import type {
    ErpDrawerState,
    ErpFieldInput,
    ErpPageKey,
    ErpToastState,
} from '@/types/erp';

export function useErpWorkspace(initialPageProp?: string) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const currentPageKey = ref<ErpPageKey>(
        initialPageProp && isValidErpPageKey(initialPageProp)
            ? initialPageProp
            : 'dashboard',
    );

    const isMobileMenuOpen = ref(false);
    const isChatOpen = ref(false);

    const drawer = reactive<ErpDrawerState>({
        isOpen: false,
        mode: 'Detail',
        title: 'Data',
        fields: [],
        isDelete: false,
    });

    const toast = reactive<ErpToastState>({
        isVisible: false,
        message: '',
    });

    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    const isDark = computed(() => resolvedAppearance.value === 'dark');
    const currentSchema = computed(() =>
        getErpPageSchema(currentPageKey.value),
    );
    const currentModule = computed(() =>
        getErpModuleForPage(currentPageKey.value),
    );
    const currentComponent = computed(() =>
        getErpPageComponent(currentPageKey.value),
    );

    function notify(text: string): void {
        toast.message = `${text}: hanya contoh UI, tidak ada data yang disimpan.`;
        toast.isVisible = true;

        if (toastTimer) {
            clearTimeout(toastTimer);
        }

        toastTimer = setTimeout(() => {
            toast.isVisible = false;
        }, 2600);
    }

    function openDemoDrawer(mode = 'Detail', title = 'Data'): void {
        const schema = currentSchema.value;
        let rawFields: ErpFieldInput[] = (schema.fields ?? []).slice(0, 8);

        if (currentPageKey.value === 'users') {
            if (/Role/i.test(mode)) {
                rawFields = [
                    [
                        'Role',
                        'select:Admin,Manager,Produksi,Gudang,QC,Finance,Purchase',
                    ],
                ];
            } else if (/Password/i.test(mode)) {
                rawFields = [
                    ['Password Baru', 'password'],
                    ['Konfirmasi Password Baru', 'password'],
                ];
            } else if (/Edit/i.test(mode)) {
                rawFields = [
                    ['Nama Lengkap', 'text'],
                    ['Email', 'email'],
                    ['Username', 'text'],
                    [
                        'Role',
                        'select:Admin,Manager,Produksi,Gudang,QC,Finance,Purchase',
                    ],
                    ['Status', 'select:Aktif,Nonaktif'],
                ];
            } else {
                rawFields = [];
            }
        }

        drawer.mode = mode;
        drawer.title = title;
        drawer.fields = parseErpFields(rawFields);
        drawer.isDelete = /hapus/i.test(mode);
        drawer.isOpen = true;
    }

    function closeDrawer(): void {
        drawer.isOpen = false;
    }

    function navigateToPage(
        pageKey: ErpPageKey,
        options: { updateHistory?: boolean } = { updateHistory: true },
    ): void {
        const validKey = isValidErpPageKey(pageKey) ? pageKey : 'dashboard';
        currentPageKey.value = validKey;
        const schema = getErpPageSchema(validKey);
        const mod = getErpModuleForPage(validKey);

        if (typeof window !== 'undefined') {
            document.title = `${schema.title} — Alfar ERP`;

            if (options.updateHistory !== false) {
                const targetUrl =
                    validKey === 'dashboard'
                        ? `/#${validKey}`
                        : `/erp/${mod.key}/${validKey}#${validKey}`;

                window.history.pushState({ erpPage: validKey }, '', targetUrl);
            }
        }
    }

    function handleAction(actionName: string): void {
        if (actionName === 'Keluar Sistem') {
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return;
        }
        if (actionName === 'Kembali ke Tally Fresh') {
            navigateToPage('freshReceipt');
            return;
        }
        if (actionName === 'Kembali ke Pengiriman') {
            navigateToPage('frozenDistSchedule');
            return;
        }
        if (actionName === 'Kembali ke Form SPK') {
            navigateToPage('spk');
            return;
        }

        if (
            /Tambah|Buat|Edit|Detail|Pilih|Simpan|Hapus|Return|Reject|Reset Password|Simpan Role/i.test(
                actionName,
            )
        ) {
            openDemoDrawer(actionName, actionName);
        } else {
            notify(actionName);
        }
    }

    function handleRowAction(actionName: string): void {
        openDemoDrawer(actionName, currentSchema.value.title || 'Detail');
    }

    function toggleTheme(): void {
        const nextTheme = isDark.value ? 'light' : 'dark';
        updateAppearance(nextTheme);
        notify(nextTheme === 'dark' ? 'Tema gelap' : 'Tema terang');
    }

    function handleHashOrPopState(): void {
        if (typeof window === 'undefined') {
            return;
        }

        const hashKey = window.location.hash.slice(1);
        if (hashKey && isValidErpPageKey(hashKey)) {
            navigateToPage(hashKey, { updateHistory: false });
            return;
        }

        const pathParts = window.location.pathname.split('/').filter(Boolean);
        const lastSegment = pathParts[pathParts.length - 1];
        if (lastSegment && isValidErpPageKey(lastSegment)) {
            navigateToPage(lastSegment, { updateHistory: false });
        }
    }

    onMounted(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const hashKey = window.location.hash.slice(1);
        if (hashKey && isValidErpPageKey(hashKey)) {
            navigateToPage(hashKey, { updateHistory: false });
        } else {
            document.title = `${currentSchema.value.title} — Alfar ERP`;
        }

        window.addEventListener('hashchange', handleHashOrPopState);
        window.addEventListener('popstate', handleHashOrPopState);
    });

    onBeforeUnmount(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('hashchange', handleHashOrPopState);
            window.removeEventListener('popstate', handleHashOrPopState);
        }
        if (toastTimer) {
            clearTimeout(toastTimer);
        }
    });

    return {
        modules: ERP_MODULES,
        currentPageKey,
        currentSchema,
        currentModule,
        currentComponent,
        isDark,
        isMobileMenuOpen,
        isChatOpen,
        drawer,
        toast,
        notify,
        openDemoDrawer,
        closeDrawer,
        navigateToPage,
        handleAction,
        handleRowAction,
        toggleTheme,
    };
}
