<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProformas } from '@/composables/useProformas'
import ProformasTable from './ProformasTable.vue'
import ProformaDetalle from './ProformaDetalle.vue'
import PrintableArea from './PrintableArea.vue'
import { Proforma } from '@/types/proforma'

interface PrintData {
  // Define aquí la estructura de los datos de impresión
  id: number
  // ... otros campos
}

interface Proforma {

}

// Estado
const searchTerm = ref<string>('')
const showModal = ref<boolean>(false)
const selectedProformaId = ref<number | null>(null)
const selectedProforma = ref<Proforma | null>(null)
const printData = ref<PrintData | null>(null)

// Composable de proformas
const {
  proformas,
  nextPage,
  prevPage,
  fetchProformas,
  searchProformas: searchProformasAPI,
  getPrintData
} = useProformas()

// Métodos
const searchProformas = async (): Promise<void> => {
  if (!isNaN(Number(searchTerm.value))) {
    await searchProformasAPI(searchTerm.value)
  } else {
    console.error('El término de búsqueda debe ser un número válido.')
  }
}

const verProforma = (proformaId: number): void => {
  selectedProformaId.value = proformaId
  showModal.value = true
}

const closeModal = (): void => {
  showModal.value = false
  selectedProformaId.value = null
}

const imprimirProforma = async (proformaId: number): Promise<void> => {
  try {
    printData.value = await getPrintData(proformaId)
    // Lógica de impresión...
  } catch (error) {
    console.error('Error al imprimir:', error)
  }
}

// Ciclo de vida
onMounted((): void => {
  fetchProformas()
})
</script>

<template>
  <div class="container mx-auto p-6 text-gray-800 dark:text-gray-400">
    <h1 class="text-4xl text-center font-bold mb-4">Historial de Proformas</h1>

    <!-- Buscador -->
    <div class="flex flex-col md:flex-row mb-4">
      <input v-model="searchTerm" placeholder="Buscar proformas"
        class="p-2 border bg-gray-100 border-gray-300 rounded-l-md md:rounded-r-none" @keyup.enter="searchProformas" />
      <button @click="searchProformas"
        class="p-2 text-white rounded-r-md md:rounded-l-none bg-[#0c3f81] hover:bg-[#082a57]">
        Buscar
      </button>
    </div>

    <!-- Tabla de Proformas -->
    <ProformasTable :proformas="proformas" @ver-proforma="verProforma" @imprimir-proforma="imprimirProforma" />

    <!-- Paginación -->
    <div class="flex justify-center m-5">
      <button @click="fetchProformas(prevPage)" :disabled="!prevPage"
        class="p-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md mx-2 disabled:opacity-50 disabled:cursor-not-allowed">
        Anterior
      </button>
      <button @click="fetchProformas(nextPage)" :disabled="!nextPage"
        class="p-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md mx-2 disabled:opacity-50 disabled:cursor-not-allowed">
        Siguiente
      </button>
    </div>

    <!-- Modal de Detalle -->
    <ProformaDetalle v-if="showModal" :proforma-id="selectedProformaId" :proforma-data="selectedProforma"
      @close="closeModal" />

    <!-- Área Imprimible -->
    <PrintableArea class="hidden" ref="printableArea" :proforma-data="printData" />
  </div>
</template>
