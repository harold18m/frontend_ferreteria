<script setup lang="ts">
import { useDashboardData } from '@/composables/useDashboardData';
import WelcomeSection from '@/components/Dashboard/WelcomeSection.vue';

const {
  companyInfo,
} = useDashboardData();
</script>

<template>
  <div class="dashboard">
    <WelcomeSection :company-info="companyInfo" />
  </div>
</template>
