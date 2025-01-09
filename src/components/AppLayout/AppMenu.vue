<script setup lang="ts">
import { useMenuItems } from '@/composables/menuItems';
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { menuItems } = useMenuItems();

// Computar el item activo basado en la ruta actual
const activeItem = computed(() => {
  return menuItems.value.find(item => route.path === item.route)?.id || 'dashboard';
});

const navigate = (item: any) => {
  router.push(item.route);
};
</script>

<template>
  <nav class="w-64 shadow-lg px-4">
    <div class="space-y-2">
      <div v-for="item in menuItems" :key="item.id" @click="navigate(item)" class="menu-item group">
        <RouterLink :to="item.route" :class="[
          'flex items-center px-4 py-3 text-gray-200 rounded-lg transition-all duration-200',
          'hover:bg-emerald-200 hover:text-gray-900',
          activeItem === item.id ? 'bg-emerald-500 font-medium' : ''
        ]">
          <i :class="[item.icon, 'text-xl font-medium']"></i>
          <span class="ml-3">{{ item.label }}</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
