import { Injectable } from '@angular/core';
import {Profesion} from '../interfaces/profesion';
@Injectable({
  providedIn: 'root'
})
export class ProfesionService {

  url = 'http://localhost:5095/api/ProfesionOficio/';

  
  async getAllProfesions(): Promise<Profesion[]> {
    const data = await fetch(`${this.url}Lista`);
    const jsonResponse = await data.json();
    const valuesArray = jsonResponse.value;
    return valuesArray ?? [];
  }
}
