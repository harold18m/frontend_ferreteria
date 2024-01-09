<template>
  <div id="app" class="container mx-auto p-6">
    <h1 class="text-4xl text-center font-bold mb-4">Historial de Proformas</h1>
    <div class="flex mb-4">
      <input v-model="searchTerm" placeholder="Buscar proformas" class="p-2 border border-gray-300 rounded-l-md" @keyup.enter="searchProformas">
      <button @click="searchProformas" class="p-2 bg-blue-500 text-white rounded-r-md">Buscar</button>
    </div>
    <table class="min-w-full divide-y border-2 divide-gray-200">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider"># Numero Proforma</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Cliente</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Fecha</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Hora</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Importe Total</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="proforma in proformas" :key="proforma.id">
          <td class="px-6 py-4 whitespace-nowrap">#{{ proforma.numero_proforma }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ proforma.cliente }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(proforma.fecha) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatTime(proforma.hora) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">S/. {{ proforma.importe_total }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-green-500 hover:text-green-800 mx-1" @click="verProforma(proforma.id)"><img class="text-green-500 hover:text-green-800 mx-1" src="@/assets/visibility.svg" alt="Icono SVG"></button>
            <ProformaDetalle 
              v-if="showModal && selectedProformaId === proforma.id" 
              @close="closeModal" 
              :proformaId="selectedProformaId" 
              :numeroProforma="proforma.numero_proforma" 
              :fecha="proforma.fecha" 
              :importeTotal="proforma.importe_total" 
            />
            <button class="text-red-500 hover:text-red-800 mx-1" @click="imprimirProforma(proforma.id)"><img src="@/assets/print.svg" alt="Icono SVG"></button>
            <button class="text-blue-500 hover:text-blue-800 mx-1" @click="copiarProforma(proforma.id)"><img src="@/assets/content_copy.svg" alt="Icono SVG"></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center m-5">
      <button @click="fetchProformas(prevPage)" :disabled="!prevPage" class="p-2 bg-gray-300 text-gray-700 rounded-md mx-2">Anterior</button>
      <button @click="fetchProformas(nextPage)" :disabled="!nextPage" class="p-2 bg-gray-300 text-gray-700 rounded-md mx-2">Siguiente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProformaDetalle from './ProformaDetalle.vue';

export default {
  components: {
    ProformaDetalle,
  },
  data() {
    return {
      searchTerm: '',
      showModal: false,
      selectedProformaId: null,
      proformas: [],
      nextPage: null,
      prevPage: null,
      totalProformas: 0,
    };
  },
  methods: {
      imprimirProforma(proformaId) {
        fetch(`http://127.0.0.1:8000/api/imprimir_proforma/${proformaId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al imprimir la proforma');
          }
          return response.json();
        })
        .then(data => {
          console.log('Proforma impresa con éxito');
        })
        .catch(error => {
          console.error('Error al imprimir la proforma:', error);
        });
      },
    fetchProformas(url = 'http://127.0.0.1:8000/api/historial_proformas/') {
      axios.get(url)
        .then(response => {
          this.proformas = response.data.results;
          this.nextPage = response.data.next;
          this.prevPage = response.data.previous;
          this.totalProformas = response.data.count;
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchProformas() {
  if (!isNaN(this.searchTerm)) {
    const url = `http://127.0.0.1:8000/api/historial_proformas/?numero_proforma=${this.searchTerm}`;
    
    axios.get(url)
      .then(response => {
        this.proformas = response.data.results;
        this.nextPage = response.data.next;
        this.prevPage = response.data.previous;
        this.totalProformas = response.data.count;
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.error('El término de búsqueda debe ser un número válido.');
  }
},
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    formatTime(time) {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
  },
    verProforma(proformaId) {
      this.selectedProformaId = proformaId;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedProformaId = null;
    },
  },
  mounted() {
    this.fetchProformas();
  },
};
</script>