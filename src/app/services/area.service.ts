import { Injectable } from '@angular/core';
import {Area} from '../interfaces/area';
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url = 'http://localhost:5095/api/Area/';

  
  async getAllAreas(): Promise<Area[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createArea({}): Promise<Area[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}