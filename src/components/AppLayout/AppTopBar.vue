<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from 'vue';
import { useSidebarStore } from '@/stores/sidebarStore';
import { useRouter } from 'vue-router';

const isDark = inject('isDark', ref(false));
const sidebarStore = useSidebarStore();
const router = useRouter();
const isProfileMenuOpen = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const handleLogout = () => {
  // Aquí puedes agregar la lógica de cierre de sesión
  localStorage.removeItem('token'); // Si usas token
  localStorage.clear(); // O limpiar todo el localStorage
  router.push('/login'); // Redirigir al login
};

// Cerrar el menú si se hace clic fuera de él
const closeMenuOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.profile-menu-container')) {
    isProfileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside);
});
</script>

<template>
  <header class="sticky top-0 h-16 w-full bg-white dark:bg-secondary-700
                   border-b border-gray-200 dark:border-secondary-600 z-50">
    <div class="h-full px-4 md:px-6 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3 md:gap-4">
        <button @click="sidebarStore.toggleSidebar" class="p-2 rounded-lg text-secondary-600 dark:text-gray-300
                       hover:bg-secondary-50 dark:hover:bg-secondary-600
                       focus:outline-none focus:ring-2 focus:ring-primary-400">
          <i class="pi pi-bars text-xl"></i>
        </button>
        <RouterLink to="/">
          <div class="flex items-center gap-3 cursor-pointer">
            <img src="/ferreteria-logo.png" alt="Logo" class="h-8 w-auto md:h-10" />
            <span class="text-lg md:text-xl font-bold text-secondary-700 dark:text-white
                               hidden sm:inline-block">
              Ferretería
            </span>
          </div>
        </RouterLink>

      </div>

      <div class="flex items-center gap-4 md:gap-6">
        <!-- Botón de notificaciones -->
        <!-- <button class="p-2 rounded-lg text-secondary-600 dark:text-gray-300
                             hover:bg-secondary-50 dark:hover:bg-secondary-600
                             focus:outline-none focus:ring-2 focus:ring-primary-400
                             relative">
          <i class="pi pi-bell text-xl"></i>
          <span class="absolute -top-1 -right-1 bg-accent-500 text-white
                               rounded-full w-5 h-5 text-xs flex items-center justify-center">
            3
          </span>
        </button> -->

        <button @click="toggleTheme" class="p-2 rounded-lg text-secondary-600 dark:text-gray-300
                               hover:bg-secondary-50 dark:hover:bg-secondary-600
                               focus:outline-none focus:ring-2 focus:ring-primary-400">
          <i :class="[isDark ? 'pi pi-sun' : 'pi pi-moon', 'text-xl']"></i>
        </button>

        <!-- Perfil de usuario -->
        <div class="relative group profile-menu-container">
          <button @click="toggleProfileMenu"
            class="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-600">
            <div
              class="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-secondary-700 font-semibold">
              HF
            </div>
            <span class="hidden md:block text-secondary-700 dark:text-white">
              Hayde Flores
            </span>
            <i class="pi pi-chevron-down text-secondary-400"></i>
          </button>

          <!-- Menú desplegable -->
          <div v-show="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-secondary-700 ring-1 ring-black ring-opacity-5">
            <div class="py-1 flex flex-col items-center">
              <button @click="handleLogout"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-secondary-600 flex items-center gap-2">
                <i class="pi pi-sign-out"></i>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main>

  </main>
</template>

<style scoped>
/* Eliminar estilos ya que usamos Tailwind */
</style>
