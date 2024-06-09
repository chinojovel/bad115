import { Injectable } from '@angular/core';
import {Puesto} from '../interfaces/puesto';
@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  url = 'http://localhost:5095/api/Puesto/';

  
  async getAllPuestos(): Promise<Puesto[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createPuesto({}): Promise<Puesto[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}
