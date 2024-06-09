import { Injectable } from '@angular/core';
import {Usuario} from '../interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:5095/api/Usuario/';

  
  async getAllUsuarios(): Promise<Usuario[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createUsuario({}): Promise<Usuario[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}