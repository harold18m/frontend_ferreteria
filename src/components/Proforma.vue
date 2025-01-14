<!-- Proforma.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import ProformaForm from './ProformaForm.vue'
import Formulario from './Proformas/Formulario.vue';

const someData = ref('')

// Aquí puedes definir tus variables reactivas, funciones, etc.
// Todo estará automáticamente disponible en el template
</script>

<template>
  <div>
    <!-- <Formulario /> -->
    <proforma-form></proforma-form>
  </div>
</template>
