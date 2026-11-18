import { accessPages } from '@/modules/access/data';
import AccessModulePage from '@/modules/access/pages/AccessModulePage.vue';
import UsersPage from '@/modules/access/pages/UsersPage.vue';
import type { ErpModuleManifest } from '@/types/erp';

export const accessModule: ErpModuleManifest = {
    key: 'access',
    groupLabel: 'Akun & Akses',
    icon: '⛨',
    navItems: [
        { label: 'Profil Saya', page: 'profile' },
        { label: 'Ubah Password Saya', page: 'selfPassword' },
        { label: 'Manajemen User', page: 'users' },
        { label: 'Audit Log Sistem', page: 'auditLog' },
    ],
    pages: accessPages,
    components: {
        users: UsersPage,
        profile: AccessModulePage,
        selfPassword: AccessModulePage,
        userAdd: AccessModulePage,
        userPassword: AccessModulePage,
        auditLog: AccessModulePage,
    },
};
