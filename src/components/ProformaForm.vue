<template>
    <div id="app" class="container mx-auto p-6">
      <h1 class="text-4xl text-center font-bold mb-6">Generador de Proformas 🧑‍💻</h1>
      
      <form @submit.prevent="submitForm" class="w-full">
        <table class="w-full table-auto">
          <thead>
              <tr>
                <th class="table-header-1 cantidad"><div class="">Cliente</div></th>
                <th class="table-header-1 descripcion"><div class="">Dirección</div></th>
                <th class="table-header-1 precio_unitario"></th>
                <th class="table-header-1 importe"></th>
                <th class="table-header-1"></th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="Ingrese el nombre del cliente" v-model="cliente" :class="{'input-con-valor': cliente}" id="cliente" name="cliente" class="input-field"></td>
              <td><input type="text" placeholder="Ingrese la dirección del cliente" v-model="direccion" :class="{'input-con-valor': direccion}" id="direccion" name="direccion" class="input-field"></td>
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
                <th class="table-header-1 precio_unitario"><div class="theader">P. Unit  (S/)</div></th>
                <th class="table-header-1 importe"><div class="theader">Importe</div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in proformaItems" :key="index">
                <td>
                  <input type="number" placeholder="#" v-model="item.cantidad" :class="{'input-con-valor': item.cantidad}" name="cantidad" min="0" class="input-field" @input="calcularImporte(item)" @keydown.enter.prevent>
                </td>
                <td>
                  <input type="text" placeholder="Nombre del producto" v-model="item.descripcion" :class="{'input-con-valor': item.descripcion}" name="descripcion" class="input-field" @keydown.enter.prevent>
                </td>
                <td>
                  <input type="number" placeholder="$" v-model="item.precio_unitario" :class="{'input-con-valor': item.precio_unitario}" name="precio_unitario" min="0" step="0.01" class="input-field" @input="calcularImporte(item)" @keydown.enter.prevent>
                </td>
                <td>
                  <input type="text" :value="calcularImporte(item)" name="importe" class="input-field" readonly @keydown.enter.prevent>
                </td>
                <td>
                  <button @click.prevent="eliminarFila(index)" class="delete-btn"><i class="fa fa-trash"></i> Eliminar </button>
                </td>
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
                <h4 style="text-align: center;">FERRETERIA VIRGEN DE GUADALUPE</h4>
                <p style="text-align: center;">Telf: 975 495 081 / 943 367 808</p>
                <p style="text-align: center;">Proforma       #{{ numeroProforma }}</p>
                <p>Fecha: {{ new Date().toLocaleDateString() }} {{ formatTime(new Date().toLocaleTimeString()) }}</p>
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
                      <th>Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in filteredProformaItems" :key="index">
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>S/{{ item.precio_unitario }}</td>
                    <td style="text-align: end;" >S/{{ item.cantidad * item.precio_unitario }}</td>
                  </tr>
                  <tr>
                    <td colspan="4"><hr></td>
                  </tr>
                  <tr style="margin-top: 10px; border-top: 1px solid black;">
                      <td colspan="3">Total a pagar: </td>
                      <td style="text-align: end;">S/{{ importeTotal }}</td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size: 15px; text-align: center;">GRACIAS POR SU PREFERENCIA !!</p>
                <p style="font-size: 0.8em; text-align: center;">No hay devoluciones</p>
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
        direccion: '',
        mensaje: '',
        cliente: localStorage.getItem('cliente') || '',
        direccion: localStorage.getItem('direccion') || '',
        proformaItems: [
          { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
          { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
          { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
          { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
          { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 }
        ],
        importeTotal: "0.00",
        datosGuardados: false
      };
    },
    watch: {
      proformaItems: {
        handler(newValue) {
          this.recalcularImporteTotal();
          localStorage.setItem('proformaItems', JSON.stringify(newValue));
        },
        deep: true
      },
      cliente(newCliente) {
        localStorage.setItem('cliente', newCliente);
      },
      direccion(newDireccion) {
        localStorage.setItem('direccion', newDireccion);
      }
    },
    computed: {
      filteredProformaItems() {
      return this.proformaItems.filter(item => item.precio_unitario !== null && item.cantidad !== null);
    },
    },
    methods: {
      calcularImporte(item) {
      return (item.cantidad * item.precio_unitario).toFixed(2);
      },
      nuevoFormulario() {
          this.direccion = '';
          this.cliente = '';
          this.mensaje = '';
          this.proformaItems = [
            { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
            { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
            { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
            { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 },
            { cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 }
          ];
          this.importeTotal = 0.00;
          this.datosGuardados = false;
        },
      agregarFila() {
        this.proformaItems.push({ cantidad: null, descripcion: '', precio_unitario: null, importe: 0.00 });
        this.recalcularImporteTotal();
        this.$forceUpdate();
      },
      eliminarFila(index) {
        this.proformaItems.splice(index, 1);
        this.$forceUpdate();
      },
      recalcularImporteTotal() {
      try {
        this.importeTotal = this.proformaItems.reduce((total, item) => {
          const importe = item.cantidad * item.precio_unitario;
          return total + importe;
        }, 0).toFixed(2);
      } catch (error) {
        console.error('Error en recalcularImporteTotal:', error);
      }
    },  
    formatTime(time) {
      const [hour, minute] = time.split(':');
      const date = new Date();
      date.setHours(+hour);
      date.setMinutes(+minute);
      return date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
    },
    imprimirProforma() {
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
      this.nuevoFormulario();
    },
      submitForm() {
        const dataToSend = {
          direccion: this.direccion,
          cliente: this.cliente,
          proformaItems: this.proformaItems
            .filter(item => item.cantidad * (item.precio_unitario || 0) !== 0)
            .map(item => ({
              cantidad: item.cantidad,
              descripcion: item.descripcion,
              precio_unitario: item.precio_unitario,
              importe: item.cantidad * (item.precio_unitario || 0)
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
            this.datosGuardados = true;
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
    },
    mounted() {
      const proformaItems = localStorage.getItem('proformaItems');
      if (proformaItems) {
        this.proformaItems = JSON.parse(proformaItems);
      }
    }
  };
  </script>

  <style scoped>

  .input-con-valor {
    background-color: #d4d3d3; 
    color: black;
  }

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

.table-header-1.precio_unitario {
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
  margin: 0 16px;
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
  