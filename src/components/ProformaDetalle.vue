//ProformaDetalle.vue
<template>
  <div
    ref="proformaDetalle"
    v-if="item_proforma"
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-white p-4 rounded-md border-2 max-w-2xl w-full overflow-x-auto"
    >
      <div class="flex justify-end">
        <button
          @click="$emit('close')"
          class="px-4 py-2 mx-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
        >
          X
        </button>
      </div>
      <!-- Contenido del modal -->
      <div ref="proformaContent">
        <div class="container-principal">
          <p class="text-center font-bold">FERRETERIA VIRGEN DE GUADALUPE</p>
          <!-- <img src="/ferreteria.jpg" alt="logo" class="mx-auto my-2 border border-black rounded h-20 w-auto"> -->
          <p class="text-center">Telf: 975 495 081 / 946 367 808</p>
          <p class="text-center">PROFORMA #{{ numeroProforma }}</p>
          <div class="container">
            <div class="sub-container">
              <p class="text">FECHA: {{ formatDate(fecha) }}</p>
            </div>
            <div class="sub-container">
              <p class="text">HORA: {{ formatTime(hora) }}</p>
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
                <th class="precio_unitario p-2">P.UNIT</th>
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
                <td class="p-2 text-center" colspan="4">
                  GRACIAS POR SU PREFERENCIA !
                </td>
              </tr>
              <tr>
                <td class="text-center text-xs" colspan="4">
                  No hay devoluciones
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mt-2">
            <p class="text-xs text-white">
              Esta proforma no tiene validez como factura
            </p>
          </div>
        </div>
      </div>
      <div class="mt-2 flex space-x-2 justify-center">
        <button
          @click="copiarProforma()"
          class="flex items-center text-black px-2 py-1 rounded border border-gray-800 bg-[#d2e062] hover:bg-[#646b2f]"
        >
          <img src="@/assets/content_copy.svg" alt="Copiar" />
          <span>Copiar</span>
        </button>
        <button
          @click="editarProforma()"
          class="flex items-center text-black px-2 py-1 rounded border mx-1 border-gray-800 bg-[#f39c12] hover:bg-[#e67e22]"
        >
          <img src="@/assets/edite.svg" alt="Editar" />
          <a href="/">Editar</a>
        </button>
        <button
          @click="$emit('close')"
          class="px-4 py-2 mx-2 bg-red-700 hover:bg-red-900 text-white rounded border border-gray-800"
        >
          X Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import html2canvas from 'html2canvas-pro'
import Swal from 'sweetalert2'

export default {
  props: [
    'proformaId',
    'numeroProforma',
    'fecha',
    'importeTotal',
    'hora',
    'cliente',
    'direccion',
  ],
  data() {
    return {
      proforma: null,
      item_proforma: null,
    }
  },
  methods: {
    editarProforma() {
      localStorage.setItem('direccion', this.direccion)
      localStorage.setItem('cliente', this.cliente)
      localStorage.setItem('proformaItems', JSON.stringify(this.item_proforma))
      console.log('proforma items', this.item_proforma)
      // localStorage.setItem('proformaItems', this.proformaItems);
    },

    formatTime(time) {
      const [hour, minute] = time.split(':')
      const date = new Date()
      date.setHours(+hour)
      date.setMinutes(+minute)
      return date.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    },
    async fetchProforma() {
      try {
        const response = await api.get(
          `api/historial-proformas/${this.proformaId}`
        )
        this.item_proforma = response.data
      } catch (error) {
        console.error('Error:', error)
      }
    },
    formatDate(dateString) {
      const [year, month, day] = dateString.split('-')
      return `${day}/${month}/${year}`
    },

    async solicitarPermisoPortapapeles() {
      try {
        const permiso = await navigator.permissions.query({
          name: 'clipboard-write',
        })
        if (permiso.state === 'granted') {
          console.log('Permiso del portapapeles concedido')
        } else if (permiso.state === 'prompt') {
          console.log('El usuario debe conceder el permiso del portapapeles')
        } else {
          console.log('Permiso del portapapeles no concedido')
        }
      } catch (err) {
        console.error('Error al solicitar el permiso del portapapeles: ', err)
      }
    },

    //copiar proforma
    copiarProforma() {
      const proformaElement = this.$refs.proformaContent

      html2canvas(proformaElement)
        .then((canvas) => {
          // Obtener el Blob del canvas
          return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Error al obtener el Blob'))
              }
            }, 'image/png')
          })
        })
        .then((blob) => {
          // Crear un ClipboardItem con el Blob
          const item = new ClipboardItem({ 'image/png': blob })

          // Copiar el objeto ClipboardItem al portapapeles
          return navigator.clipboard.write([item])
        })
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Copiado al portapapeles',
            showConfirmButton: false,
            timer: 1500,
          })
        })
        .catch((error) => {
          console.error('Error al copiar la imagen al portapapeles:', error)
        })
    },

    generarImagen() {
      this.$nextTick(() => {
        if (this.$refs.proformaDetalle) {
          html2canvas(this.$refs.proformaDetalle).then((canvas) => {
            canvas.toBlob((blob) => {
              const item = new ClipboardItem({ 'image/png': blob })
              window.focus()
              navigator.clipboard
                .write([item])
                .then(() => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Copiado al portapapeles',
                    showConfirmButton: false,
                    timer: 1500,
                  })
                })
                .catch((error) => {
                  console.error(
                    'Error al copiar la imagen al portapapeles:',
                    error
                  )
                })
            })
          })
        }
      })
    },
  },
  watch: {
    proformaId() {
      this.fetchProforma()
    },
  },
  mounted() {
    this.fetchProforma()
    this.generarImagen()
    this.solicitarPermisoPortapapeles()
  },
}
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

.precio_unitario {
  width: 15%;
}

.importe {
  width: 15%;
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

.edit {
  background-color: #f39c12;
}
.edit:hover {
  background-color: #e67e22;
}
</style>
