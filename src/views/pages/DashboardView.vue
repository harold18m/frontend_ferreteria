<script setup lang="ts">
import { useDashboardData } from '@/composables/useDashboardData';
import WelcomeSection from '@/components/Dashboard/WelcomeSection.vue';

const {
  companyInfo,
  estadisticas,
  rubroCards,
  menuItems,
  ultimasActualizaciones
} = useDashboardData();
</script>

<template>
  <div class="dashboard">
    <WelcomeSection :company-info="companyInfo" />
    <EstadisticasPanel :estadisticas="estadisticas" />
    <div class="grid">
      <RubrosList :rubros="rubroCards" class="col-12 md:col-4" />
      <MenuAccesos :menu-items="menuItems" class="col-12 md:col-4" />
      <div class="col-12 md:col-4">
        <ContactInfo :contact-info="companyInfo.contactInfo" />
        <ActualizacionesTimeline :actualizaciones="ultimasActualizaciones" />
      </div>
    </div>
  </div>
</template>
