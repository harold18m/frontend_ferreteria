<template>
    <div id="app" class="container mx-auto p-6">
      <h1 class="text-4xl text-center font-bold mb-4">Generador de Proformas</h1>
      <form @submit.prevent="submitForm" class="w-full">
        <div class="mb-4 flex justify-between items-center">
          <div class="w-1/3">
            <label for="cliente" class="block text-gray-700 text-1xl font-bold mb-2">Cliente:</label>
            <input type="text" placeholder="Ingrese el nombre del cliente" v-model="cliente" id="cliente" name="cliente" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div>
            <button @click.prevent="nuevoFormulario" class="action-btn right text-white py-2 px-4 rounded">Nueva proforma</button>
          </div>
        </div>
        <table class="w-full table-auto">
          <thead>
              <tr>
                <th class="table-header cantidad">Cantidad (Unidades)</th>
                <th class="table-header descripcion">Descripción</th>
                <th class="table-header punit">P. Unit  (S/)</th>
                <th class="table-header importe">Importe</th>
                <th class="table-header acciones">Acciones</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="(item, index) in proformaItems" :key="index">
              <td><input type="number" required placeholder="10" v-model="item.cantidad" name="cantidad" min="0" class="input-field" @input="calcularImporte(item)" @keydown.enter.prevent></td>
              <td><input type="text"  required placeholder="Nombre del producto" v-model="item.descripcion" name="descripcion" class="input-field" @keydown.enter.prevent></td>
              <td><input type="number" required placeholder="10.00" v-model="item.punit" name="punit" min="0" step="0.01" class="input-field" @input="calcularImporte(item)" @keydown.enter.prevent></td>
              <td><input type="number" v-model="item.importe" name="importe" step="0.01" class="input-field" readonly @keydown.enter.prevent></td>
              <td><button @click.prevent="eliminarFila(index)" class="delete-btn" style="margin-left: 12%;">Eliminar</button></td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td class="font-bold text-left">Importe Total:</td>
              <td>S/{{ importeTotal }} </td>
            </tr>
          </tbody>
        </table>
        <div class="button-container">
            <button @click.prevent="agregarFila" class="action-btn add" >Agregar Fila</button>
            <input type="submit" value="Guardar" class="action-btn right">
            <button @click.prevent="imprimir" class="action-btn right" :disabled="!datosGuardados">Imprimir</button>
            <button @click.prevent="copiarAlPortapapeles" class="action-btn right" :disabled="!datosGuardados">Copiar al Portapapeles</button>
        </div>
      </form>
      <div :style="{ opacity: mensaje ? 1 : 0 }" class="mensaje-verificacion">
        {{ mensaje }}
      </div>
    </div>
  </template>
  
  <script>

import axios from 'axios';

  export default {
    data() {
      return {
        cliente: '',
        mensaje: '',
        proformaItems: [
          { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
          { cantidad: 1, descripcion: '', punit: null, importe: 0.00 }
        ],
        importeTotal: 0,
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
    methods: {
      imprimir() {
        
        window.print();
      },
      nuevoFormulario() {
          this.cliente = '';
          this.mensaje = '';
          this.proformaItems = [
            { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: 1, descripcion: '', punit: null, importe: 0.00 },
            { cantidad: 1, descripcion: '', punit: null, importe: 0.00 }
          ];
          this.importeTotal = 0;
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
        this.importeTotal = this.proformaItems.reduce((total, item) => {
          item.importe = item.cantidad * item.punit;
          item.importe = parseFloat(item.importe.toFixed(2)).toLocaleString('es-PE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: false
          });
          return total + parseFloat(item.importe.replace(',', '')) || 0;
        }, 0).toFixed(2).toLocaleString('es-PE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: false
        });
      },
      submitForm() {
      // Calcular el importe total
      const importeTotal = this.proformaItems.reduce((total, item) => total + Number(item.importe), 0);

      // Obtener solo los datos necesarios sin la envoltura reactiva
      const dataToSend = {
        cliente: this.cliente,
        proformaItems: this.proformaItems,
        importeTotal: importeTotal
      };
      axios.post('http://127.0.0.1:8000/api/crear_proforma/', dataToSend)
        .then(response => {
          this.mensaje = response.data.message;
          setTimeout(() => {
            this.mensaje = '';
          }, 3000);
        });
        console.log('Formulario enviado:', dataToSend);
        this.datosGuardados = true;
    }
    }
  };
  </script>

  <style scoped>
  .mensaje-verificacion {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  background-color: #3bb35b;
  color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  width: 250px;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
}

 .input-cliente {
  width: 33.33%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
}

.table-auto {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}

.table-header.cantidad {
  width: 15%; /* Ajusta este valor según tus necesidades */
}

.table-header.descripcion {
  width: 40%; /* Ajusta este valor según tus necesidades */
}

.table-header.punit {
  width: 15%; /* Ajusta este valor según tus necesidades */
}

.table-header.importe {
  width: 15%; /* Ajusta este valor según tus necesidades */
}

.table-header.acciones {
  width: 10%; /* Ajusta este valor según tus necesidades */
}

.table-header,
.input-field,
.delete-btn,
.action-btn {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
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
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.action-btn.add {
  background-color: #5cb800;
}
.action-btn.add:hover {
  background-color: #4d9b00;
}
.action-btn {
  background-color: #074783;
  color: white;
  border: none;
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
  