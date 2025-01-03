<script setup lang="ts">
import type { CompanyInfo } from '@/types/dashboard';
defineProps<{
  companyInfo: CompanyInfo;
}>();
</script>

<template>
  <div class="surface-0 p-4 text-gray-800 dark:text-gray-200">
    <div class="shadow-2 rounded-lg border p-5">
      <div class="flex flex-column align-items-center">
        <div class="text-center">
          <p class="font-bold text-xl">
            Bienvenido a {{ companyInfo.name }}
          </p>
          <p class="text-700 text-lg line-height-3 mb-0">
            {{ companyInfo.description }}
          </p>
        </div>
        <img :src="companyInfo.logo" alt="Logo" width="180" class="rounded-lg hidden md:block" />
      </div>
    </div>
  </div>
</template>
