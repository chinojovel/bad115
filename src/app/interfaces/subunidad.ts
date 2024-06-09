export interface Subunidad {
    codigo: number;
    nombre: string;
    codArea: number;
    nombreArea?: string;
    codUnidadPadre?: number;
    nombreUnidadPadre?: string;
    subUnidades?: Subunidad[];
  }
  