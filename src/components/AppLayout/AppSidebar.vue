<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useSidebarStore } from '@/stores/sidebarStore';
import AppMenu from './AppMenu.vue'

const router = useRouter();
const sidebarStore = useSidebarStore();

const cerrarSesion = () => {
  localStorage.removeItem('token');
  router.push('/login');
}

const close = () => {
  sidebarStore.toggleSidebar();
}
</script>

<template>
  <aside class="fixed rounded-lg w-72
                bg-secondary-700 text-white
                border-r border-secondary-600
                transform transition-all duration-300 ease-out
                hover:shadow-xl z-40
                flex flex-col">
    <!-- Información del usuario -->
    <div class="p-4 border-b border-secondary-600 bg-secondary-800/50">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center
                    text-secondary-700 font-bold text-lg">
          HF
        </div>
        <div class="flex flex-col">
          <span class="font-medium">Hayde Flores</span>
          <span class="text-sm text-gray-400">Administrador</span>
        </div>
        <button @click="close()" class="ml-auto focus:outline-none">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto py-4 px-3">
      <app-menu />
    </div>

    <div class="p-4 border-t border-secondary-600 bg-secondary-800/50
                space-y-4">
      <RouterLink to="/login">
        <button @click="cerrarSesion()" class="w-full px-4 py-2.5 bg-red-500 hover:bg-red-600
                       text-white rounded-lg transition-colors duration-200
                       flex items-center justify-center gap-2
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                       focus:ring-offset-secondary-700">
          <i class="pi pi-sign-out"></i>
          <span>Cerrar sesión</span>
        </button>
      </RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.transform {
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>
