import { Injectable } from '@angular/core';
import {Unidad} from '../interfaces/unidad';
@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  url = 'http://localhost:5095/api/DptoUnidad/';

  
  async getAllUnidads(): Promise<Unidad[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createUnidad({}): Promise<Unidad[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}