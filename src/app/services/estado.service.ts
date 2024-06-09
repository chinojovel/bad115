import { Injectable } from '@angular/core';
import {Estado} from '../interfaces/estado';
@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  url = 'http://localhost:5095/api/EstadoCivil/';

  
  async getAllEstados(): Promise<Estado[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createEstado({}): Promise<Estado[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}