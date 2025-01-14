<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../api'

interface ExchangeRateResponse {
  tipo_de_cambio: number
}

const usdToPenExchangeRate = ref<number | null>(null)
const medidas = ref(['5/8', '1/2', '3/8', '8mm', '6mm', '3/4'])
const cantidadxtoneladas = ref([75, 116, 208, 288, 516, 51])
const pcompra = ref<number>(Number(localStorage.getItem('pcompra')) || 0)
const pventa = ref<number>(Number(localStorage.getItem('pventa')) || 0)

watch(pcompra, (newValue) => {
  localStorage.setItem('pcompra', newValue.toString())
})

watch(pventa, (newValue) => {
  localStorage.setItem('pventa', newValue.toString())
})

const calcularPrecioCompra = (cantidadxtonelada: number): number => {
  return ((usdToPenExchangeRate.value || 0) * pcompra.value) / cantidadxtonelada
}

const calcularPrecioVenta = (cantidadxtonelada: number): number => {
  return ((usdToPenExchangeRate.value || 0) * pventa.value) / cantidadxtonelada
}

const calcularGanancia = (cantidadxtonelada: number): number => {
  const precioCompra = calcularPrecioCompra(cantidadxtonelada)
  const precioVenta = calcularPrecioVenta(cantidadxtonelada)
  return precioVenta - precioCompra
}

const fetchExchangeRate = async (): Promise<void> => {
  const lastFetch = localStorage.getItem('lastFetch')
  const now = new Date()

  if (lastFetch && now.getTime() - new Date(lastFetch).getTime() < 1 * 60 * 60 * 1000) {
    usdToPenExchangeRate.value = Number(localStorage.getItem('usdToPenExchangeRate'))
  } else {
    try {
      const response = await api.get<ExchangeRateResponse>('api/tipo-de-cambio/')
      usdToPenExchangeRate.value = Math.round(response.data.tipo_de_cambio * 100) / 100
      localStorage.setItem('usdToPenExchangeRate', usdToPenExchangeRate.value.toString())
      localStorage.setItem('lastFetch', now.toString())
    } catch (error) {
      console.error('Error al obtener la tasa de cambio:', error)
    }
  }
}

onMounted(() => {
  fetchExchangeRate()
})
</script>

<template>
  <div class="container mx-auto p-4 md:p-6 text-gray-800 dark:text-gray-200">
    <h1 class="text-xl md:text-2xl font-bold mb-4">Tasa de Cambio Dólar a Soles</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="rounded-lg py-4">
        <label for="usdToPenExchangeRate" class="block text-sm font-medium text-gray-600 dark:text-gray-400">
          Tasa de cambio $ a PEN:
        </label>
        <input id="usdToPenExchangeRate" v-model.number="usdToPenExchangeRate" type="number"
          class="mt-1 p-2 w-full border border-gray-300 rounded-lg " />
      </div>

      <div class="rounded-lg py-4 ">
        <label for="pcompra" class="block text-sm font-medium text-gray-600 dark:text-gray-400">
          Precio de compra $:
        </label>
        <input id="pcompra" v-model.number="pcompra" type="number"
          class="mt-1 p-2 w-full border rounded-lg border-gray-300" />
      </div>

      <div class="rounded-lg py-4">
        <label for="pventa" class="block text-sm font-medium text-gray-600 dark:text-gray-400">
          Precio de venta $:
        </label>
        <input id="pventa" v-model.number="pventa" type="number"
          class="mt-1 p-2 w-full border rounded-lg border-gray-300" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-2/3">
        <div class="overflow-x-auto border border-gray-300 rounded-lg">
          <table class="min-w-full divide-y text-center divide-gray-200 bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Medida</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio
                  compra</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio
                  venta</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ganancia
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(medida, index) in medidas" :key="index"
                class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {{ medida }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  S/{{ calcularPrecioCompra(cantidadxtoneladas[index]).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  S/{{ calcularPrecioVenta(cantidadxtoneladas[index]).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  S/{{ calcularGanancia(cantidadxtoneladas[index]).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full md:w-1/3">
        <div class="overflow-x-auto border border-gray-300 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cantidad * Tonelada
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="cantidadxtonelada in cantidadxtoneladas" :key="cantidadxtonelada"
                class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {{ cantidadxtonelada }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
