// planilla.dto.ts

export interface Planilla {
    codigo: number;
    fecha: string;
    codEmpresa: number;
    nombreEmpresa?: string;
    codEmpleado: number;
    nombreEmpleado?: string;
    horasExtrasDiurnas?: number;
    horasExtrasNocturnas?: number;
    horasNocturnas?: number;
    vacaciones?: number;
    aguinaldo?: number;
    montoGravadoCotizable?: number;
    afpPatronal?: number;
    afpEmpleado?: number;
    isssPatronal?: number;
    isssEmpleado?: number;
    impuestoRenta?: number;
    montoEmpleado?: number;
    montoPlanillaUnica?: number;
  }
  