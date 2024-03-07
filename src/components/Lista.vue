<template>
    <div class="max-w-md mx-auto mt-8 p-4">
      <h1 class="text-3xl font-bold mb-4">Lista de Pedidos</h1>
      <ul v-if="tasks.length > 0">
        <li v-for="task in tasks" :key="task.id" class="flex items-center mb-2">
          <input type="checkbox" v-model="task.completed" @change="confirmCompletion(task)" class="mr-2">
          <span class="{ 'line-through text-gray-600 font-bold': task.completed }">🏷️#{{ task.numeroProforma }}</span>
          <span class="{ 'line-through text-gray-600 font-bold': task.completed }">⌚Fecha: {{ task.fecha }}</span>
          <button class="text-green-500 hover:text-green-800 mx-1" @click="verProforma(task.id)"><img class="visibility" src="@/assets/visibility.svg"></button>
          <ProformaDetalle 
            ref="proformaDetalle"
            v-if="showModal && selectedProformaId === task.id" 
            @close="closeModal" 
            :proformaId="selectedProformaId" 
            :numeroProforma="task.numeroProforma" 
            :fecha="task.fecha" 
            :hora="task.hora"
            :cliente="task.cliente"
            :direccion="task.direccion"
            :importeTotal="task.importeTotal" 
          />
        </li>
      </ul>
      <p v-else>
        Estás al día, no hay proformas pendientes.
      </p>
    </div>
  </template>
<script>

import Swal from 'sweetalert2';
import api from '../api';
import ProformaDetalle from './ProformaDetalle.vue';

export default {
  components: {
    ProformaDetalle,
  },
  data() {
    return {
      tasks: [],
      showModal: false,
      selectedProformaId: null,
    };
  },
  methods: { 
    verProforma(proformaId) {
      this.selectedProformaId = proformaId;
      this.showModal = true;
    },
    closeModal() {
        this.showModal = false;
        this.selectedProformaId = null;
      },
    async confirmCompletion(task) {
      if (task.completed) {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "¿Quieres marcar este pedido como completada?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, completar!'
        });

        if (result.isConfirmed) {
          const response = await api.post('api/proformas-pendientes/', {
            id: task.id,
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pedido completado",
            showConfirmButton: false,
            timer: 1000
          });
        } else {
          task.completed = false;
        }
      }
    }
  },
  async created() {
    const token = localStorage.getItem('token');
    const response = await api.get('api/proformas-pendientes/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    this.tasks = response.data.results.map(item => ({
      id: item.id,
      numeroProforma: item.numero_proforma,
      cliente: item.cliente,
      direccion: item.direccion,
      fecha: item.fecha,
      hora: item.hora,
      importeTotal: item.importe_total,
      completed: item.completed,
    }));
  },
};
</script>
<style scoped>
img {
  border: black 1px solid;

  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
.visibility {
  background-color: #2f80ed;
}
.visibility:hover {
  background-color: #0c3f81;
}

</style>
