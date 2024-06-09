import { Injectable } from '@angular/core';
import {Empleado} from '../interfaces/empleado';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url = 'http://localhost:5095/api/Empleado/';

  
  async getAllEmpleados(): Promise<Empleado[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createEmpleado({}): Promise<Empleado[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}
