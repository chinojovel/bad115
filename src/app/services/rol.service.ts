import { Injectable } from '@angular/core';
import {Rol} from '../interfaces/rol';
@Injectable({
  providedIn: 'root'
})
export class RolService {
  url = 'http://localhost:5095/api/Rol/';

  
  async getAllRols(): Promise<Rol[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createRol({}): Promise<Rol[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}