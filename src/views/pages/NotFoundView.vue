<script setup lang="ts">
import { RouterLink } from 'vue-router';

// Function to go back in history
function regresar() {
  window.history.back();
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-800 dark:to-secondary-900
              flex flex-col items-center justify-center px-6 py-8">
    <!-- Blobs de fondo -->
    <div class="relative w-full max-w-lg mb-8">
      <div class="absolute top-0 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply
                  filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply
                  filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply
                  filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Contenido de error -->
    <div class="text-center z-10">
      <h1 class="text-6xl md:text-7xl font-bold text-secondary-600 dark:text-secondary-300
                 mb-4 animate-fadeIn">
        404
      </h1>
      <h2 class="text-3xl md:text-4xl font-semibold text-secondary-500 dark:text-secondary-400
                 mb-6 animate-fadeIn animation-delay-300">
        Página no encontrada
      </h2>
      <p class="text-lg text-secondary-400 dark:text-secondary-500 mb-8 max-w-md mx-auto
                animate-fadeIn animation-delay-600">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>

      <!-- Botones de acción -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4
                  animate-fadeIn animation-delay-900">
        <button @click="regresar()" class="px-6 py-3 border-2 border-secondary-400 hover:border-secondary-500
                       text-secondary-600 dark:text-secondary-400 rounded-lg
                       transition-all duration-300 flex items-center gap-2">
          <i class="pi pi-arrow-left"></i>
          <span>Regresar</span>
        </button>
        <RouterLink to="/" class="px-6 py-3 bg-secondary-600 hover:bg-secondary-700
                           text-white rounded-lg transition-all duration-300
                           flex items-center gap-2 group">
          <i class="pi pi-home text-lg"></i>
          <span>Volver al inicio</span>
          <i class="pi pi-arrow-right transition-transform group-hover:translate-x-1"></i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
