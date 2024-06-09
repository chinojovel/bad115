import { Injectable } from '@angular/core';
import {Subunidad} from '../interfaces/subunidad';
@Injectable({
  providedIn: 'root'
})
export class SubunidadService {
  url = 'http://localhost:5095/api/SubUnidad/';

  
  async getAllSubunidads(): Promise<Subunidad[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createSubunidad({}): Promise<Subunidad[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}