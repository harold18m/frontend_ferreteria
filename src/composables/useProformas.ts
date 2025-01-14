import { ref, type Ref } from 'vue'
import api from '@/api'

interface Proforma {
  id: number
  numero_proforma: string
  // Agrega aquí más propiedades según tu modelo
}

interface ApiResponse {
  results: Proforma[]
  next: string | null
  previous: string | null
  count: number
}

export function useProformas() {
  const proformas: Ref<Proforma[]> = ref([])
  const nextPage: Ref<string | null> = ref(null)
  const prevPage: Ref<string | null> = ref(null)
  const totalProformas: Ref<number> = ref(0)

  const fetchProformas = async (url: string = 'api/historial-proformas/'): Promise<void> => {
    try {
      const response = await api.get<ApiResponse>(url, {
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

  const searchProformas = async (term: string): Promise<void> => {
    const url = `api/historial-proformas/?numero_proforma=${term}`
    await fetchProformas(url)
  }

  const getPrintData = async (proformaId: number): Promise<any> => {
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
