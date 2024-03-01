//ProformaDetalle.vue
<template>
    <div ref="proformaDetalle" v-if="item_proforma" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-md border-2 max-w-2xl w-full" >
        <!-- Contenido del modal -->
        <div ref="proformaContent"> 
        <div class="container-principal">
          <p class="text-center mb-3">FERRETERIA VIRGEN DE GUADALUPE</p>
          <p class="text-center">Telf: 975 495 081 / 946 367 808 </p>
          <p class="text-center">PROFORMA #{{ numeroProforma }} </p>
        <div class="container">
          <div class="sub-container">
            <p class="text">FECHA: {{ formatDate(fecha)}} </p>
          </div>
          <div class="sub-container">
            <p class="text">HORA: {{ formatTime(hora) }} </p>
          </div>
        </div>
        
        <div class="container">
          <div class="sub-container">
            <p class="text text-left">CLIENTE: {{ cliente }}</p>
          </div>
          <div class="sub-container">
            <p class="text text-left">DIRECCIÓN: {{ direccion }}</p>
          </div>
        </div>

        <table class="min-w-full border mt-2 border-gray-300">
          <thead class="bg-gray-200">
            <tr>
              <th class="cantidad p-2">CANT</th>
              <th class="descripcion p-2 text-left">DESCRIPCION</th>
              <th class="punit p-2">P.UNIT</th>
              <th class="importe p-2">IMPORTE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in item_proforma" :key="detalle.id">
              <td class="p-2 text-center">{{ detalle.cantidad }}</td>
              <td class="p-2 text-left">{{ detalle.descripcion }}</td>
              <td class="p-2 text-center">S/{{ detalle.precio_unitario }}</td>
              <td class="p-2 text-center">S/{{ detalle.importe }}</td>
            </tr>
          </tbody>  
        </table>
        <table class="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center pl-8" colspan="3">Total a pagar</td>
              <td class="text-right px-4">S/{{ importeTotal }}</td>
            </tr>
            <tr>
              <td class="p-2 text-center" colspan="4">GRACIAS POR SU PREFERENCIA !</td>
            </tr>
            <tr>
              <td class="text-center text-xs" colspan="4">No hay devoluciones</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p class="text-black text-opacity-0 p-0">Hola</p>
        </div>
        </div>
        </div>
        <div class="button-container mt-2">
          <button @click="$emit('close')" class="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md">Cerrar</button>
          <button @click="copiarProforma()" class="mx-2"><img class="copy" src="@/assets/content_copy.svg"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../api';
  import html2canvas from 'html2canvas';
  import Swal from 'sweetalert2';

  export default {
    props: ['proformaId', 'numeroProforma', 'fecha', 'importeTotal', 'hora', 'cliente', 'direccion'],
    data() {
      return {
        proforma: null,
        item_proforma: null,
      };
    },
    methods: {
      formatTime(time) {
        const [hour, minute] = time.split(':');
        const date = new Date();
        date.setHours(+hour);
        date.setMinutes(+minute);
        return date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
      },
      async fetchProforma() {
        try {
          const response = await api.get(`api/historial-proformas/${this.proformaId}`);
          this.item_proforma = response.data;
        } catch (error) {
          console.error('Error:', error);
        }
      },
      formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
        },

      async solicitarPermisoPortapapeles() {
        try {
          const permiso = await navigator.permissions.query({name: "clipboard-write"});
          if (permiso.state === "granted") {
            console.log('Permiso del portapapeles concedido');
          } else if (permiso.state === "prompt") {
            console.log('El usuario debe conceder el permiso del portapapeles');
          } else {
            console.log('Permiso del portapapeles no concedido');
          }
        } catch (err) {
          console.error('Error al solicitar el permiso del portapapeles: ', err);
        }
      },

      //copiar proforma
      copiarProforma() {
        const proformaElement = this.$refs.proformaContent;

        html2canvas(proformaElement).then(canvas => {
          // Obtener el Blob del canvas
          return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Error al obtener el Blob'));
              }
            }, 'image/png');
          });
        }).then(blob => {
          // Crear un ClipboardItem con el Blob
          const item = new ClipboardItem({ 'image/png': blob });

          // Copiar el objeto ClipboardItem al portapapeles
          return navigator.clipboard.write([item]);
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Copiado al portapapeles",
            showConfirmButton: false,
            timer: 1500
          });
        }).catch(error => {
          console.error('Error al copiar la imagen al portapapeles:', error);
        });
      },
      
    generarImagen() {
        this.$nextTick(() => {
          if (this.$refs.proformaDetalle) {
            html2canvas(this.$refs.proformaDetalle).then(canvas => {
              canvas.toBlob(blob => {
                const item = new ClipboardItem({ 'image/png': blob });
                window.focus(); 
                navigator.clipboard.write([item]).then(() => {
                  Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Copiado al portapapeles",
                  showConfirmButton: false,
                  timer: 1500
                });
                }).catch(error => {
                  console.error('Error al copiar la imagen al portapapeles:', error);
                });
              });
            });
          }
        });
      },
    },
    watch: {
      proformaId() {
        this.fetchProforma();
      },
    },
    mounted() {
      this.fetchProforma();
      this.generarImagen();
      this.solicitarPermisoPortapapeles();
    },
  };
  </script>
  
  <style scoped>
  .container-principal {
    margin: 15px;
  }
  
  .container {
  display: flex;
  justify-content: space-between;
}
.sub-container {
  width: 50%;
}
  .cantidad {
    width: 10%;
  }
  .descripcion {
    width: 60%;
  }
  .punit {
    width: 15%;
  }
  .importe {
    width: 15%;
  }
  img {
  border: black 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
}
  .copy {
  background-color: #d2e062;
}
.copy:hover {
  background-color: #646b2f;
}
.button-container {
  display: flex;
  justify-content: center;
}
  </style>