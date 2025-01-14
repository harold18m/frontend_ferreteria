<script setup lang="ts">

import { Proforma } from '@/types/proforma'

const props = defineProps<{
  proformas: Proforma[]
}>()

const emit = defineEmits<{
  'ver-proforma': [id: number]
  'imprimir-proforma': [id: number]
}>()

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':')
  const date = new Date()
  date.setHours(+hour)
  date.setMinutes(+minute)
  return date.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}
</script>

<template>
  <div class="overflow-x-auto border border-gray-300 rounded-lg">
    <table class="min-w-full divide-y divide-gray-200 bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"># Numero Proforma
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dirección</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hora</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Importe Total
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="proforma in proformas" :key="proforma.id" :id="'proforma-' + proforma.id"
          class="hover:bg-gray-50 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
            #{{ proforma.numero_proforma }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ proforma.cliente }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ proforma.direccion }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(proforma.fecha) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatTime(proforma.hora) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            S/. {{ proforma.importe_total }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button @click="emit('ver-proforma', proforma.id)"
              class="inline-flex items-center justify-center p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              title="Ver detalle">
              <i class="pi pi-eye text-lg"></i>
            </button>
            <button @click="emit('imprimir-proforma', proforma.id)"
              class="inline-flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-green-100 transition-colors duration-200"
              title="Imprimir proforma">
              <i class="pi pi-print text-lg"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
