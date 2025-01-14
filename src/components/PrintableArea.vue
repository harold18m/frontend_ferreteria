<script setup>
const props = defineProps({
  proformaData: {
    type: Object,
    default: null
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const formatTime = (time) => {
  if (!time) return ''
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
  <div id="printableArea" class="hidden">
    <h4 class="text-center">FERRETERIA VIRGEN DE GUADALUPE</h4>
    <p class="text-center">Telf: 975 495 081 / 943 367 808</p>
    <p class="text-center">Proforma #{{ proformaData?.numero_proforma }}</p>
    <p>Fecha: {{ formatDate(proformaData?.fecha) }} {{ formatTime(proformaData?.hora) }}</p>
    <div class="container">
      <div class="sub-container">
        <p class="text">Cliente: {{ proformaData?.cliente }}</p>
      </div>
      <div class="sub-container">
        <p class="text">Direccion: {{ proformaData?.direccion }}</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Cant</th>
          <th>Descripcion</th>
          <th>P. Unit</th>
          <th class="text-end">Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in proformaData?.proforma_items" :key="index">
          <td>{{ item.cantidad }}</td>
          <td>{{ item.descripcion }}</td>
          <td>S/{{ item.precio_unitario }}</td>
          <td class="text-end">S/{{ item.importe }}</td>
        </tr>
        <tr>
          <td colspan="4">
            <hr />
          </td>
        </tr>
        <tr class="mt-2 border-t border-black">
          <td colspan="3">Total a pagar:</td>
          <td class="text-end">S/{{ proformaData?.importe_total }}</td>
        </tr>
        <tr>
          <td colspan="4">
            <hr />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-center text-sm">GRACIAS POR SU PREFERENCIA !!</p>
    <p class="text-center text-xs">No hay devoluciones</p>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}

.container {
  display: flex;
  justify-content: space-between;
}

.sub-container {
  width: 50%;
}

table {
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
}

.text-end {
  text-align: right;
}
</style>
