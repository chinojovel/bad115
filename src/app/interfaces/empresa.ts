export interface Empresa {
    codigo: number;
    nit?: string;
    nombre?: string;
    representante?: string;
    codMunicipio: number;
    nombreMunicipio?: string;
    direccion?: string;
    telefono?: string;
    paginaWeb?: string;
    email?: string;
    planillaMensual: boolean;
  }