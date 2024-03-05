<template>
    <div id="app" class="container mx-auto p-6">
      <h1 class="text-4xl text-center font-bold mb-6">Generador de Proformas 🧑‍💻</h1>
      <form @submit.prevent="submitForm" class="w-full">
        <table class="w-full table-auto">
          <thead>
              <tr>
                <th class="table-header-1 cantidad"> <div class="">Cliente</div></th>
                <th class="table-header-1 descripcion"><div class="">Dirección</div></th>
                <th class="table-header-1 punit"></th>
                <th class="table-header-1 importe"></th>
                <th class="table-header-1"></th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="Ingrese el nombre del cliente" v-model="cliente" id="cliente" name="cliente" class="input-field"></td>
              <td><input type="text" placeholder="Ingrese la dirección del cliente" v-model="direccion" id="direccion" name="direccion" class="input-field"></td>
              <td colspan="2"></td>
              <td><button @click.prevent="nuevoFormulario" class="action-btn">Nueva proforma</button></td>
            </tr>
          </tbody>
        </table> 
        <table class="w-full table-auto">
          <thead>
              <tr>
                <th class="table-header-1 cantidad"><div class="theader">Cantidad (Unidades)</div></th>
                <th class="table-header-1 descripcion"><div class="theader">Descripción</div></th>
                <th class="table-header-1 punit"><div class="theader">P. Unit  (S/)</div></th>
                <th class="table-header-1 importe"><div class="theader">Importe</div></th>
                <th class="table-header-1 acciones"><div class="theader">Acciones</div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in proformaItems" :key="index">
                <td><input type="number" placeholder="#" v-model="item.cantidad" name="cantidad" min="0" class="input-field" @input="calcularImporte(item)" @keydown.enter.prevent></td>
                <td><input type="text" placeholder="Nombre del producto" v-model="item.descripcion" name="descripcion" class="input-field" @keydown.enter.prevent></td>
                <td><input type="number" placeholder="$" v-model="item.punit" name="punit" min="0" step="0.01" class="input-field" @input="calcularImporte(item)" @keydown.enter.prevent></td>
                <td><input type="text" :value="calcularImporte(item)"  name="importe" class="input-field" readonly @keydown.enter.prevent></td>
                <td><button @click.prevent="eliminarFila(index)" class="delete-btn" style="margin-left: 12%;">Eliminar</button></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td class="font-bold text-right pr-2">Importe Total:</td>
                <td><input type="text" :value="importeTotal" class="input-field" readonly></td>
                <td></td>
              </tr>
            </tbody>
        </table>
        <div class="button-container">
            <button @click.prevent="agregarFila" class="action-btn add" >Agregar Fila</button>
            <input type="submit" value="Guardar" class="action-btn right">
            <div v-if="datosGuardados">
              <button type="button" @click="imprimirProforma" class="action-btn right">Imprimir</button>
              <div id="printableArea" class="hidden">
                <p>FERRETERIA VIRGEN DE GUADALUPE</p>
                <p>Telf: 975 495 081 / 943 367 808</p>
                <p>Proforma: {{ numeroProforma }}</p>
                <p>Fecha: {{ new Date().toLocaleDateString() }}</p>
                <p>Hora: {{ new Date().toLocaleTimeString() }}</p>
                <p>Cliente: {{ cliente }}</p>
                <p>Dirección: {{ direccion }}</p>
                <p v-for="(item, index) in filteredProformaItems" :key="index">
                  <p>------------------------------------</p>
                  <p>Descripcion: {{ item.descripcion }}</p>
                  <p>Cant: {{ item.cantidad }}</p>
                  <p>P. Unit: S/{{ item.punit }}</p>
                  <p>Importe: S/{{ item.cantidad * item.punit }}</p>
                </p>
                <p>------------------------------------</p>
                <p>Total a pagar : S/{{ importeTotal }}</p>
                <p>------------------------------------</p>
                <p>GRACIAS POR SU PREFERENCIA !!</p>
                <p style="font-size: 0.8em;">No hay devoluciones</p>
              </div>
            </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>

import Swal from 'sweetalert2';
import api from '../api';

  export default {
    data() {
      return {
        numeroProforma: '#########',
        cliente: '',
        direccion: '',
        mensaje: '',
        proformaItems: [
          { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: null, descripcion: '', punit: null, importe: 0.00 }
        ],
        importeTotal: "0.00",
        datosGuardados: false
      };
    },
    watch: {
      proformaItems: {
        handler() {
          this.recalcularImporteTotal();
        },
        deep: true
      }
    },
    computed: {
      filteredProformaItems() {
      return this.proformaItems.filter(item => item.punit !== null && item.cantidad !== null);
    },
    },
    methods: {
      calcularImporte(item) {
      return (item.cantidad * item.punit).toFixed(2);
      },
      nuevoFormulario() {
          this.direccion = '';
          this.cliente = '';
          this.mensaje = '';
          this.proformaItems = [
            { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: null, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: null, descripcion: '', punit: null, importe: 0.00 }
          ];
          this.importeTotal = 0.00;
          this.datosGuardados = false;
        },
      agregarFila() {
        this.proformaItems.push({ cantidad: null, descripcion: '', punit: null, importe: 0.00 });
        this.recalcularImporteTotal();
      },
      eliminarFila(index) {
        this.proformaItems.splice(index, 1);
      },
      recalcularImporteTotal() {
      try {
        this.importeTotal = this.proformaItems.reduce((total, item) => {
          const importe = item.cantidad * item.punit;
          return total + importe;
        }, 0).toFixed(2);
      } catch (error) {
        console.error('Error en recalcularImporteTotal:', error);
      }
    },  
    imprimirProforma() {
      const printableArea = document.getElementById('printableArea');
      const printWindow = window.open('', '_blank', 'width=600,height=600');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Proforma</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              p {
                margin: 5px;
              }
              h1 {
                text-align: center;
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
    },
      submitForm() {
        this.datosGuardados = true;
        const dataToSend = {
          direccion: this.direccion,
          cliente: this.cliente,
          proformaItems: this.proformaItems
            .filter(item => item.cantidad * (item.punit || 0) !== 0)
            .map(item => ({
              cantidad: item.cantidad,
              descripcion: item.descripcion,
              punit: item.punit,
              importe: item.cantidad * (item.punit || 0)
            })),
          importeTotal: this.importeTotal
        };
        api.post('api/crear-proforma/', dataToSend)
          .then(response => {
            Swal.fire(
              '¡Éxito!',
              response.data.message,
              'success'
            );
            this.numeroProforma = response.data.numero_proforma;
          })
          .catch(error => {
            if (error.response && error.response.data) {
              Swal.fire(
                'Error',
                error.response.data.message,
                'error'
              )
            } else {
              Swal.fire(
                'Error',
                'Ocurrió un error al crear la proforma',
                'error'
              )
            }
          });
      }
    }
  };
  </script>

  <style scoped>
  .hidden {
    display: none;
  }

 .input-cliente {
  width: 33.33%;
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.table-auto {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}
.theader {
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
  background-color: #f2f2f2;
}
.table-header-1.cantidad {
  width: 15%; /* Ajusta este valor según tus necesidades */
}

.table-header-1.descripcion {
  width: 40%; /* Ajusta este valor según tus necesidades */
}

.table-header-1.punit {
  width: 15%; /* Ajusta este valor según tus necesidades */
}

.table-header-1.importe {
  width: 15%; /* Ajusta este valor según tus necesidades */
}

.table-header-1.acciones {
  width: 10%; /* Ajusta este valor según tus necesidades */
}

.table-header-1 {
  color: black;
}

.input-field {
  padding: 8px;
  text-align: center;
  border: 1px solid rgb(143, 140, 140);
  border-radius: 4px;
}
.delete-btn,
.action-btn {
  padding: 8px;
  text-align: center;
  border: 1px solid black;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: flex-between;
  align-items: center;
}

.action-btn.right {
  margin-left: auto;
}

.delete-btn{
  background-color: #e71607;
  color: white;
  border: black 1px solid;
  border-radius: 4px;
  cursor: pointer;
}
.action-btn.add {
  background-color: #5cb800;
  color: black;
}
.action-btn.add:hover {
  background-color: #4d9b00;
}
.action-btn {
  background-color: #074783;
  color: white;
  border: solid 1px solid;
  border-radius: 4px;
  cursor: pointer;
}
.action-btn.add {
  margin-right: auto;
}
.action-btn.right {
  margin-left: 0;
  margin-right: 16px;
}
.delete-btn:hover{
  background-color: #f3746b;
}
.action-btn:hover {
  background-color: #4574a0;
}

.delete-btn:disabled,
.action-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.delete-btn[disabled]:hover,
.action-btn[disabled]:hover {
  background-color: #ccc;
}
  </style>
  