<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
    <header>
      <!-- Navbar -->
    <nav class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <!-- logo -->
              <RouterLink to="/" class="text-white font-bold text-xl">
                <img style="height: 40px"  loading="lazy" src="@/assets/logo.png" alt="Workflow">
              </RouterLink>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink to="/" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Proforma</RouterLink>
              <RouterLink to="/historial" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Historial</RouterLink>
              <RouterLink to="/precio-fierro" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Precio Fierro</RouterLink>
              <RouterLink to="#" class="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Otros</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>

    <RouterView />
    
  </div>
    
  <footer>
    <div
      class="bg-white p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
      © 2024 Copyright:
      <a
        class="text-neutral-800 dark:text-neutral-400"
        href="#"
        > Ferreteria Virgen de Guadalupe
        </a
      >
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: auto;
}
</style>