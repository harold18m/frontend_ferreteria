<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Tasa de Cambio Dólar a Soles</h1>
    <div class="flex mb-4 my-2">
      <div class="mr-4">
        <label for="usdToPenExchangeRate" class="block text-sm font-medium text-gray-600">Tasa de cambio $ a PEN:</label>
        <input id="usdToPenExchangeRate" v-model.number="usdToPenExchangeRate" type="number" class="mt-1 p-2 border rounded-md w-32" />
      </div>
      <div class="mr-4">
        <label for="pcompra" class="block text-sm font-medium text-gray-600">Precio de compra $:</label>
        <input name="pcompra" v-model.number="pcompra" type="number" class="mt-1 p-2 border rounded-md w-32" />
      </div>
      <div>
        <label for="pventa" class="block text-sm font-medium text-gray-600">Precio de venta $:</label>
        <input name="pventa" v-model.number="pventa" type="number" class="mt-1 p-2 border rounded-md w-32" />
      </div>
    </div>

    <div class="tables-container flex justify-between mt-2">
      <table class="w-1/2 border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-center">Medida</th>
            <th class="py-2 px-4 border-b text-center">Precio compra</th>
            <th class="py-2 px-4 border-b text-center">Precio venta</th>
            <th class="py-2 px-4 border-b text-center">Ganancia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(medida, index) in medidas" :key="index">
            <td class="py-2 px-4 border-b text-center">{{ medida }}</td>
            <td class="py-2 px-4 border-b text-center">S/{{ calcularPrecioCompra(cantidadxtoneladas[index]).toFixed(2) }}</td>
            <td class="py-2 px-4 border-b text-center">S/{{ calcularPrecioVenta(cantidadxtoneladas[index]).toFixed(2) }}</td>
            <td class="py-2 px-4 border-b text-center">S/{{ calcularGanancia(cantidadxtoneladas[index]).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="w-1/2 flex justify-center">
        <table class="w-2/5 border border-gray-300">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Cantidad * Tonelada</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cantidadxtonelada) in cantidadxtoneladas" :key="cantidadxtonelada">
              <td class="py-2 px-4 border-b text-center">{{ cantidadxtonelada }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usdToPenExchangeRate: null,
      medidas: ['5/8', '1/2', '3/8', '8mm', '6mm', '3/4'],
      cantidadxtoneladas: [75, 116, 208, 288, 516, 51],
      pcompra: localStorage.getItem('pcompra') || 0,
      pventa: localStorage.getItem('pventa') || 0,
    };
  },
  watch: {
    pcompra(newPcompra) {
      localStorage.setItem('pcompra', newPcompra);
    },
    pventa(newPventa) {
      localStorage.setItem('pventa', newPventa);
    },
  },
  mounted() {
    this.fetchExchangeRate();
  },
  methods: {
    calcularPrecioCompra(cantidadxtonelada) {
      return this.usdToPenExchangeRate * this.pcompra / cantidadxtonelada;
    },
    calcularPrecioVenta(cantidadxtonelada) {
      return this.usdToPenExchangeRate * this.pventa / cantidadxtonelada;
    },
    calcularGanancia(cantidadxtonelada) {
      const precioCompra = this.calcularPrecioCompra(cantidadxtonelada);
      const precioVenta = this.calcularPrecioVenta(cantidadxtonelada);
      return precioVenta - precioCompra;
    },
    fetchExchangeRate() {
      const apiUrl = `http://127.0.0.1:8000/api/tipo-de-cambio/`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.usdToPenExchangeRate = data.tipo_de_cambio;
        })
        .catch(error => console.error('Error al obtener la tasa de cambio:', error));
    },
  },
};
</script>
