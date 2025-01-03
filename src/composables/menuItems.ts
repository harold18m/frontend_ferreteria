import type { MenuItem } from "@/types/dashboard";
import { ref } from "vue";

export function useMenuItems() {
  const menuItems = ref<MenuItem[]>([
    { id: 'dashboard', icon: 'pi pi-th-large', label: 'Dashboard', route: '/' },
    { id: 'proformas', icon: 'pi pi-file-edit', label: 'Proforma', route: '/proformas' },
    { id: 'historial', icon: 'pi pi-history', label: 'Historial', route: '/historial' },
    { id: 'precio-fierro', icon: 'pi pi-dollar', label: 'Precio del Fierro', route: '/precio-fierro' },
    { id: 'lista', icon: 'pi pi-list', label: 'Lista Pendientes', route: '/lista' },
    { id: 'reportes', icon: 'pi pi-chart-line', label: 'Reportes', route: '/#' },
  ]);

  return { menuItems };
}
