import { defineStore } from 'pinia'
import type { Proforma, ProformaItem } from '@/types/proforma'

export const useProformaStore = defineStore('proforma', {
  state: () => ({
    proformaItems: [] as ProformaItem[],
    currentProforma: null as Proforma | null,
    loading: false,
    error: null as string | null,
    numeroProforma: '',
    datosGuardados: false
  }),

  getters: {
    importeTotal: (state) => {
      return state.proformaItems.reduce((total, item) => {
        return total + ((item.cantidad ?? 0) * (item.precio_unitario ?? 0))
      }, 0).toFixed(2)
    }
  },

  actions: {
    addItem(item: ProformaItem) {
      this.proformaItems.push(item)
    },

    removeItem(index: number) {
      this.proformaItems.splice(index, 1)
    },

    clearProforma() {
      this.proformaItems = []
      this.numeroProforma = ''
      this.datosGuardados = false
    }
  },

  persist: {
    key: 'proforma-data',
    storage: sessionStorage, // o localStorage
    pick: ['proformaItems'] // solo persiste proformaItems
  }
})
