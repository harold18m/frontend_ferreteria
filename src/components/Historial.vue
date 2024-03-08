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
          <th class="px-6 py-3 text-left text-xs uppercase tracking-wider">Completado?</th>
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
          <td class="px-6 py-4 whitespace-nowrap flex justify-center items-center">
            <i v-if="proforma.completed" class="fas fa-check text-green-500 my-2" @click="confirmCompletion(proforma)"></i>
            <i v-else class="fas fa-times text-red-500 my-2" @click="confirmCompletion(proforma)"></i>
          </td>
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
            <div id="printableArea" class="hidden">
                <h4 style="text-align: center;">FERRETERIA VIRGEN DE GUADALUPE</h4>
                <p style="text-align: center;">Telf: 975 495 081 / 943 367 808</p>
                <p style="text-align: center;">Proforma       #{{ numeroProforma }}</p>
                <p>Fecha: {{ formatDate(fecha) }} {{ formatTime(hora) }}</p>
                <div class="container">
                  <div class="sub-container">
                    <p class="text">Cliente: {{ cliente }} </p>
                  </div>
                  <div class="sub-container">
                    <p class="text">Direccion: {{ direccion }} </p>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Cant</th>
                      <th>Descripcion</th>
                      <th>P. Unit</th>
                      <th style="text-align: end;">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in itemsProforma" :key="index">
                      <td>{{ item.cantidad }}</td>
                      <td>{{ item.descripcion }}</td>
                      <td>S/{{ item.precio_unitario }}</td>
                      <td style="text-align: end;">S/{{ item.importe }}</td>
                    </tr>
                    <tr>
                      <td colspan="4"><hr></td>
                    </tr>
                    <tr style="margin-top: 10px; border-top: 1px solid black;">
                      <td colspan="3">Total a pagar: </td>
                      <td style="text-align: end;">S/{{ importeTotal }}</td>
                    </tr>
                    <tr>
                      <td colspan="4"><hr></td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size: 15px; text-align: center;">GRACIAS POR SU PREFERENCIA !!</p>
                <p style="font-size: 0.8em; text-align: center;">No hay devoluciones</p>
              </div>
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
      numeroProforma: '',
      cliente: '',
      direccion: '',
      importeTotal: 0,
      fecha: '',
      hora: '',
      itemsProforma: [],
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
          // Resto de tu lógica para obtener los datos de la proforma
          this.numeroProforma = response.data.numero_proforma;
          this.cliente = response.data.cliente;
          this.direccion = response.data.direccion;
          this.importeTotal = response.data.importe_total;
          this.fecha = response.data.fecha;
          this.hora = response.data.hora;
          this.itemsProforma = response.data.proforma_items;

          this.$nextTick(() => {
            // Resto de tu lógica para abrir la ventana de impresión
            const printableArea = document.getElementById('printableArea');
            let anchoVentana = 600;
            let altoVentana = 600;
            let posicionX = (window.screen.width / 2) - (anchoVentana / 2);
            let posicionY = (window.screen.height / 2) - (altoVentana / 2);

            const printWindow = window.open('', '_blank', `width=${anchoVentana},height=${altoVentana},left=${posicionX},top=${posicionY}`);
            printWindow.document.open();
            printWindow.document.write(`
              <html>
                <head>
                  <title>Proforma</title>
                  <style>
                    @media print {
                      @page {
                        size: 21cm 29.7cm;
                        margin: 0;
                      }
                    }
                    body {
                      font-family: Arial, sans-serif;
                    }
                    img {
                      border: black 1px solid;
                      border-radius: 5px;
                      text-align: center;
                      height: 70px;
                      width: 70px;
                    }
                    #printableArea {
                      margin-left: 80px;
                    }
                    P {
                      margin: 0px;
                    }
                    table {
                      margin-top: 10px;
                      margin-bottom: 10px;
                    }
                    .container {
                      display: flex;
                      justify-content: space-between;
                    }
                    .sub-container {
                      width: 50%;
                    }
                    .text {
                      text-align: left;
                    }
                  </style>
                </head>
                <body>
                  ${printableArea.innerHTML}
                </body>
              </html>
            `);
            printWindow.document.close();
            printWindow.print();
            printWindow.close();
          });
        })
        .catch(error => {
          console.error(error);
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
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
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
.hidden {
  display: none;
}
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