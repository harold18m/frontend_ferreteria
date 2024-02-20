<template>
  <div id="app" class="container mx-auto p-6">
    <h1 class="text-4xl text-center font-bold mb-4">Historial de Proformas</h1>
    <div class="flex flex-col md:flex-row mb-4">
      <input v-model="searchTerm" placeholder="Buscar proformas" class="p-2 border border-gray-300 rounded-l-md md:rounded-r-none" @keyup.enter="searchProformas">
      <button @click="searchProformas" class="p-2 text-white rounded-r-md md:rounded-l-none" style="background-color: #0c3f81;">Buscar</button>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y border-2 divide-gray-200">
        <thead class="bg-gray-200">
        <tr>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider"># Numero Proforma</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Cliente</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Dirección</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Fecha</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Hora</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Importe Total</th>
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="proforma in proformas" :key="proforma.id" :id="'proforma-' + proforma.id">
          <td class="px-6 py-4 whitespace-nowrap">#{{ proforma.numero_proforma }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ proforma.cliente }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ proforma.direccion }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(proforma.fecha) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ formatTime(proforma.hora) }}</td>
          <td class="px-6 py-4 whitespace-nowrap">S/. {{ proforma.importe_total }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-green-500 hover:text-green-800 mx-1" @click="verProforma(proforma.id)"><img class="visibility" src="@/assets/visibility.svg"></button>
            <ProformaDetalle 
              ref="proformaDetalle"
              v-if="showModal && selectedProformaId === proforma.id" 
              @close="closeModal" 
              :proformaId="selectedProformaId" 
              :numeroProforma="proforma.numero_proforma" 
              :fecha="proforma.fecha" 
              :hora="proforma.hora"
              :cliente="proforma.cliente"
              :direccion="proforma.direccion"
              :importeTotal="proforma.importe_total" 
            />
            <button @click="imprimirProforma(proforma.id)"><img class="print" src="@/assets/print.svg"></button>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
    <div class="flex justify-center m-5">
      <button @click="fetchProformas(prevPage)" :disabled="!prevPage" class="p-2 bg-gray-300 text-gray-700 rounded-md mx-2">Anterior</button>
      <button @click="fetchProformas(nextPage)" :disabled="!nextPage" class="p-2 bg-gray-300 text-gray-700 rounded-md mx-2">Siguiente</button>
    </div>
  </div>
</template>

<script>

import api from '../api';
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
        api.get(`api/imprimir-proforma/${proformaId}/`, {
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

      // Método para recuperar proformas
      fetchProformas(url = 'api/historial-proformas/') {
        api.get(url, {
            headers: {
              'Authorization': `Token ${localStorage.getItem('token')}`
            }})
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

      // Método para buscar proformas
      searchProformas() {
        if (!isNaN(this.searchTerm)) {
          const url = `api/historial-proformas/?numero_proforma=${this.searchTerm}`;
          
          api.get(url, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }})
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

<style scoped>
img {
  border: black 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
}
.visibility {
  background-color: #2f80ed;
}
.visibility:hover {
  background-color: #0c3f81;
}

.print {
  background-color: #749e0c;
}
.print:hover {
  background-color: #3a4e05;
}


</style>