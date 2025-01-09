export interface Proforma {
  id?: number
  numero_proforma: string
  cliente: string
  direccion: string
  importeTotal: number
  proformaItems: ProformaItem[]
}

export interface ProformaItem {
  cantidad: number | null
  descripcion: string | null
  precio_unitario: number | null
  importe: number
}
