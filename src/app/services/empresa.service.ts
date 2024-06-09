import { Injectable } from '@angular/core';
import {Empresa} from '../interfaces/empresa';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  url = 'http://localhost:5095/api/Empresa/';

  
  async getAllEmpresas(): Promise<Empresa[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createEmpresa({}): Promise<Empresa[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}