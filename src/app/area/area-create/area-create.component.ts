import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '../../interfaces/unidad';


@Component({
  selector: 'app-area-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './area-create.component.html',
  styleUrl: './area-create.component.css'
})
export class AreaCreateComponent {
  areaService: AreaService = inject(AreaService);
  unidadService: UnidadService = inject(UnidadService);
  favoriteFramework: string ="";
  unidadList: Unidad[] = [];
  selectedUnidad: string = "";
  constructor() {
    this.unidadService.getAllUnidads().then((unidadList: Unidad[]) => {
      this.unidadList = unidadList;
    });
  }
  sendForm(): void {
    console.log(this.selectedUnidad); // Aquí puedes hacer lo que necesites con la area seleccionada
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];
    console.log(cuerpo)
    cuerpo["codDpto"] = parseInt(cuerpo["codDpto"]);
    //this.areaService.createArea(form["value"]);
    fetch("http://localhost:5095/api/Area/Guardar", {
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
