<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import AppHeader from '@/components/AppLayout/AppTopBar.vue';
import AppSidebar from '@/components/AppLayout/AppSidebar.vue';
import AppBreadcrumb from '@/components/AppLayout/AppBreadcrumb.vue';

const isDark = ref(document.documentElement.classList.contains('dark'));
const isSidebarVisible = ref(true);
const isMobile = ref(false);
const isClosing = ref(false);

// Función para manejar el responsive del sidebar
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    isSidebarVisible.value = false;
  }
};

// Toggle del sidebar
const toggleSidebar = () => {
  if (isSidebarVisible.value) {
    isClosing.value = true;
    setTimeout(() => {
      isSidebarVisible.value = false;
      isClosing.value = false;
    }, 300); // Duración de la transición
  } else {
    isSidebarVisible.value = true;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

provide('isDark', isDark);
provide('isSidebarVisible', isSidebarVisible);
provide('toggleSidebar', toggleSidebar);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800">
    <app-header />

    <!-- Overlay mejorado -->
    <div v-show="isMobile && (isSidebarVisible || isClosing)"
         class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
         :class="{ 'opacity-0': isClosing, 'opacity-100': !isClosing }"
         @click="toggleSidebar" />

    <!-- Sidebar con transición mejorada -->
    <aside v-show="isSidebarVisible || isClosing"
           class="fixed left-5 top-20 bottom-5 w-72 transition-transform duration-300 z-40"
           :class="{ '-translate-x-full': isClosing, 'translate-x-0': !isClosing }">
      <app-sidebar />
    </aside>

    <!-- Contenedor principal con transición de página -->
    <div :class="[
      'transition-all duration-300 ease-in-out',
      isSidebarVisible ? 'md:ml-72' : ''
    ]">
      <main class="container mx-auto px-16 py-6 max-w-7xl">
        <app-breadcrumb />
        <router-view v-slot="{ Component }">
          <Transition enter-from="opacity-0 translate-y-6" enter-to="opacity-100 translate-y-0"
            enter-active="transition-all duration-300 ease-out" leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-6" leave-active="transition-all duration-300 ease-in" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

