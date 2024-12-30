<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeItem = ref('dashboard');

const menuItems = [
    { id: 'dashboard', icon: 'pi pi-th-large', label: 'Dashboard', route: '/' },
    { id: 'proformas', icon: 'pi pi-file-edit', label: 'Proforma', route: '/proformas' },
    { id: 'historial', icon: 'pi pi-history', label: 'Historial', route: '/historial' },
    { id: 'precio-fierro', icon: 'pi pi-dollar', label: 'Precio del Fierro', route: '/precio-fierro' },
    { id: 'lista', icon: 'pi pi-list', label: 'Lista Pendientes', route: '/lista' },
    { id: 'reportes', icon: 'pi pi-chart-line', label: 'Reportes', route: '/' },
];

const navigate = (item: any) => {
    activeItem.value = item.id;
    router.push(item.route);
};
</script>

<template>
    <nav class="menu-nav">
        <a v-for="item in menuItems"
           :key="item.id"
           @click="navigate(item)"
           :class="['menu-item', { active: activeItem === item.id }]">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
        </a>
    </nav>
</template>

<style scoped>
.menu-nav {
    @apply flex flex-col gap-2 px-4;
}

.menu-item {
    @apply flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
           text-gray-300
           hover:text-gray-800
           hover:bg-primary-50 dark:hover:bg-primary-900/30
           transition-all duration-200;
}

.menu-item.active {
    @apply bg-primary-100 dark:bg-primary-900/50
           text-primary-600 dark:text-primary-400;
}

.menu-item i {
    @apply text-lg;
}
</style>
