import { Injectable } from '@angular/core';
import {Centro} from '../interfaces/centro';
@Injectable({
  providedIn: 'root'
})
export class CentroService {
  url = 'http://localhost:5095/api/CentroCosto/';

  
  async getAllCentros(): Promise<Centro[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createCentro({}): Promise<Centro[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}