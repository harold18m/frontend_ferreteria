import { ref } from 'vue'
import api from '@/api'

export function useProformas() {
  const proformas = ref([])
  const nextPage = ref(null)
  const prevPage = ref(null)
  const totalProformas = ref(0)

  const fetchProformas = async (url = 'api/historial-proformas/') => {
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      proformas.value = response.data.results
      nextPage.value = response.data.next
      prevPage.value = response.data.previous
      totalProformas.value = response.data.count
    } catch (error) {
      console.error(error)
    }
  }

  const searchProformas = async (term) => {
    const url = `api/historial-proformas/?numero_proforma=${term}`
    await fetchProformas(url)
  }

  const getPrintData = async (proformaId) => {
    const response = await api.get(`api/imprimir-proforma/${proformaId}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  }

  return {
    proformas,
    nextPage,
    prevPage,
    totalProformas,
    fetchProformas,
    searchProformas,
    getPrintData,
  }
}
