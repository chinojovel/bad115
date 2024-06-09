export interface Puesto {
    codigo: number;
    nombre: string;
    descripcion?: string;
    salarioMin: number;
    salarioMax: number;
    codEmpresa: number;
    nombreEmpresa?: string;
    codSubunidad?: number;
    nombreSubUnidad?: string;
  }