import { ref } from 'vue';
import type { CompanyInfo, Estadistica, RubroCard, MenuItem, Actualizacion } from '@/types/dashboard';

export function useDashboardData() {
  const companyInfo = ref<CompanyInfo>({
    name: 'Ferretería Virgen de Guadalupe',
    slogan: 'Calidad y servicio en materiales de construcción',
    logo: '/ferreteria-logo.png',
    welcomeMessage: '¡Bienvenido al Sistema de Gestión!',
    description: 'Accede a todas las herramientas necesarias para gestionar tu negocio de manera eficiente.',
    contactInfo: {
      telefono: '923 456 789',
      direccion: 'Av. Principal 123, Lima',
      email: 'contacto@ferreteriavirgen.com',
      horario: 'Lun-Sab: 8:00 AM - 6:00 PM'
    }
  });

  const estadisticas = ref<Estadistica[]>([
    // ...tus estadísticas existentes...
  ]);

  const rubroCards = ref<RubroCard[]>([
    // ...tus rubroCards existentes...
  ]);

  const menuItems = ref<MenuItem[]>([
    // ...tus menuItems existentes...
  ]);

  const ultimasActualizaciones = ref<Actualizacion[]>([
    // ...tus actualizaciones existentes...
  ]);

  return {
    companyInfo,
    estadisticas,
    rubroCards,
    menuItems,
    ultimasActualizaciones
  };
}
