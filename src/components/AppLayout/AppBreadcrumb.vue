<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(path => path);
  return paths.map((path, index) => {
    return {
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: '/' + paths.slice(0, index + 1).join('/'),
      isLast: index === paths.length - 1
    };
  });
});
</script>

<template>
  <div class="flex flex-col gap-2 pb-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <RouterLink to="/" class="text-gray-500 hover:text-primary-600 text-sm">
            <i class="pi pi-home mr-2"></i>
            Inicio
          </RouterLink>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <div class="flex items-center">
            <i class="pi pi-angle-right text-gray-400 mx-2"></i>
            <router-link v-if="!crumb.isLast" :to="crumb.path" class="text-gray-500 hover:text-primary-600 text-sm">
              {{ crumb.name }}
            </router-link>
            <span v-else class="text-primary-600 text-sm">
              {{ crumb.name }}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
