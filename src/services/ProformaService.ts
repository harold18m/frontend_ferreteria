import axios from 'axios'
import type { Proforma, ProformaItem } from '@/types/proforma'

interface ProformaResponse {
  message: string
  numero_proforma: string
}

export const proformaService = {
  async createProforma(data: {
    cliente: string
    direccion: string
    proformaItems: ProformaItem[]
    importeTotal: number
  }): Promise<ProformaResponse> {
    try {
      const response = await axios.post('crear-proforma/', data)
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.message)
      }
      throw new Error('Error al crear la proforma')
    }
  },

  async getProformas(): Promise<Proforma[]> {
    try {
      const response = await axios.get('historial-proformas/')
      return response.data.results
    } catch (error) {
      throw new Error('Error al obtener las proformas')
    }
  },

  async deleteProforma(id: number): Promise<void> {
    try {
      await axios.delete(`proformas/${id}`)
    } catch (error) {
      throw new Error('Error al eliminar la proforma')
    }
  },

  // Métodos para localStorage
  saveToLocalStorage(items: ProformaItem[]): void {
    localStorage.setItem('proformaItems', JSON.stringify(items))
  },

  getFromLocalStorage(): ProformaItem[] | null {
    const items = localStorage.getItem('proformaItems')
    return items ? JSON.parse(items) : null
  }
}
