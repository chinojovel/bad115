export interface Usuario{
    codigo: number;
    correo: string;
    contrasena: string;
    codEmpleado: number;
    nombreEmpleado?: string;
    codRol: number;
    nombreRol?: string;
    intentosLogin?: number;
    activo: boolean;
  }