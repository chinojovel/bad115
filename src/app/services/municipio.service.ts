import { Injectable } from '@angular/core';
import {Municipio} from '../interfaces/municipio';
@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  url = 'http://localhost:5095/api/Municipio/';

  
  async getAllMunicipios(): Promise<Municipio[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createMunicipio({}): Promise<Municipio[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}