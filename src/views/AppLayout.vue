<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { useSidebarStore } from '@/stores/sidebarStore';
import AppHeader from '@/components/AppLayout/AppTopBar.vue';
import AppSidebar from '@/components/AppLayout/AppSidebar.vue';
import AppBreadcrumb from '@/components/AppLayout/AppBreadcrumb.vue';

const isDark = ref(document.documentElement.classList.contains('dark'));
const sidebarStore = useSidebarStore();

onMounted(() => {
  sidebarStore.updateMobileState();
  window.addEventListener('resize', sidebarStore.updateMobileState);
});

provide('isDark', isDark);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black">
    <app-header />

    <!-- Overlay mejorado -->
    <div v-show="sidebarStore.isMobile && (sidebarStore.isVisible || sidebarStore.isClosing)"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
      :class="{ 'opacity-0': sidebarStore.isClosing, 'opacity-100': !sidebarStore.isClosing }"
      @click="sidebarStore.toggleSidebar" />

    <!-- Sidebar con transición mejorada -->
    <aside v-show="sidebarStore.isVisible || sidebarStore.isClosing"
      class="fixed left-5 top-20 bottom-5 w-72 transition-transform duration-300 z-40"
      :class="{ '-translate-x-full': sidebarStore.isClosing, 'translate-x-0': !sidebarStore.isClosing }">
      <app-sidebar />
    </aside>

    <!-- Contenedor principal con transición de página -->
    <div :class="[
      'transition-all duration-300 ease-in-out',
      sidebarStore.isVisible ? 'md:ml-72' : ''
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
