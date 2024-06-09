import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CentroService } from '../../services/centro.service';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '../../interfaces/unidad';


@Component({
  selector: 'app-centro-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './centro-create.component.html',
  styleUrl: './centro-create.component.css'
})
export class CentroCreateComponent {
  centroService: CentroService = inject(CentroService);
  unidadService: UnidadService = inject(UnidadService);
  favoriteFramework: string ="";
  unidadList: Unidad[] = [];
  selectedUnidad: string = "";
  nombre: string = "";
  fechaAsignacion: string = "";
  montoInicial: number = 0;
  montoActual: number = 0;
  constructor() {
    this.unidadService.getAllUnidads().then((unidadList: Unidad[]) => {
      this.unidadList = unidadList;
    });
  }
  sendForm(): void {
    console.log(this.selectedUnidad); // Aquí puedes hacer lo que necesites con la centro seleccionada
  }
  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    let cuerpo=form["value"];
    console.log(cuerpo)
    cuerpo["codDpto"] = parseInt(cuerpo["codDpto"]);
    //this.centroService.createCentro(form["value"]);
    fetch("http://localhost:5095/api/CentroCosto/Guardar", {
      method: 'POST', // o 'GET' si es una solicitud GET
      headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }
}
