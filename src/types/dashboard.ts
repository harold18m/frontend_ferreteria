export interface CompanyInfo {
  name: string;
  slogan: string;
  logo: string;
  welcomeMessage: string;
  description: string;
  contactInfo: ContactInfo;
}

export interface ContactInfo {
  telefono: string;
  direccion: string;
  email: string;
  horario: string;
}

export interface Estadistica {
  titulo: string;
  valor: string;
  icono: string;
  color: string;
}

export interface RubroCard {
  title: string;
  icon: string;
  description: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  description?: string;
}

export interface Actualizacion {
  fecha: string;
  titulo: string;
  descripcion: string;
}
