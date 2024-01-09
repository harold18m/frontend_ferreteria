//ProformaDetalle.vue
<template>
    <div v-if="item_proforma" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-md max-w-5xl w-full">
        <!-- Contenido del modal -->
        <h2 class="text-2xl font-bold mb-4 text-center">Detalles de la Proforma #{{ numeroProforma }} </h2>
        <p class="text-balance font-bold mb-1">Fecha: {{ formatDate(fecha) }}</p>
        <table class="min-w-full border my-5 border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2">Cantidad</th>
              <th class="p-2">Descripción</th>
              <th class="p-2">P. Unit</th>
              <th class="p-2">Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in item_proforma" :key="detalle.id">
              <td class="p-2 text-center">{{ detalle.cantidad }}</td>
              <td class="p-2 text-center">{{ detalle.descripcion }}</td>
              <td class="p-2 text-center">{{ detalle.precio_unitario }}</td>
              <td class="p-2 text-center">S/{{ detalle.importe }}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-balance font-bold mt-2">Importe Total:
            <data class="mx-5 text-balance">S/{{ importeTotal }}</data>
        </p>
        <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md mx-auto flex items-end">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['proformaId', 'numeroProforma', 'fecha', 'importeTotal'],
    data() {
      return {
        proforma: null,
        item_proforma: null,
      };
    },
    methods: {
      fetchProforma() {
        axios.get(`http://127.0.0.1:8000/api/historial_proformas/${this.proformaId}`)
          .then(response => {
            this.item_proforma = response.data;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
        },
    },
    watch: {
      proformaId() {
        this.fetchProforma();
      },
    },
    mounted() {
      this.fetchProforma();
    },
  };
  </script>
  
  <style scoped>
  </style>