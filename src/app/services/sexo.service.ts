import { Injectable } from '@angular/core';
import {Sexo} from '../interfaces/sexo';
@Injectable({
  providedIn: 'root'
})
export class SexoService {
  url = 'http://localhost:5095/api/Sexo/';

  
  async getAllSexos(): Promise<Sexo[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createSexo({}): Promise<Sexo[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}