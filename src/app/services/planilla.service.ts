import { Injectable } from '@angular/core';
import {Planilla} from '../interfaces/planilla';
@Injectable({
  providedIn: 'root'
})
export class PlanillaService {
  url = 'http://localhost:5095/api/Planilla/';

  
  async getAllPlanillas(): Promise<Planilla[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
  async createPlanilla({}): Promise<Planilla[]> {
    const data = await fetch(`${this.url}Guardar`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}