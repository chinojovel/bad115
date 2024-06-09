import { Injectable } from '@angular/core';
import {Permiso} from '../interfaces/permiso';
@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  url = 'http://localhost:5095/api/Permiso/';

  
  async getAllPermisos(): Promise<Permiso[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createPermiso({}): Promise<Permiso[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}
