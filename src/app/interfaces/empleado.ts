// empleado.dto.ts

export interface Empleado {
    codigo: number;
    dui: string;
    primerNombre: string;
    segundoNombre?: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    apellidoCasada?: string;
    fechaNacimiento: string;
    codSexo: number;
    nombreSexo?: string; //
    codEstadoCivil: number; //
    nombreEstadoCivil?: string;
    codMunicipio: number; //
    nombreMunicipio?: string;
    codProfesion: number;//
    nombreProfesion?: string;
    pasaporte?: string;
    nit?: string;
    nup: number;
    isss: number;
    email?: string;
    fechaIngreso: string;
    codEmpresa: number; //
    nombreEmpresa?: string;
    codPuesto: number; //
    nombrePuesto?: string;
    codJefe?: number;// asi mismo 
    nombreJefe?: string;
    salario: number;
    empleados?: Empleado[];//
    usuarios?: {};
  }
  