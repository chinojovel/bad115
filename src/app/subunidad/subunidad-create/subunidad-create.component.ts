import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { SubunidadService } from '../../services/subunidad.service';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '../../interfaces/unidad';
import { Subunidad } from '../../interfaces/subunidad';
import { Area } from '../../interfaces/area';
import { AreaService } from '../../services/area.service';


@Component({
  selector: 'app-subunidad-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './subunidad-create.component.html',
  styleUrl: './subunidad-create.component.css'
})
export class SubunidadCreateComponent {
  subunidadService: SubunidadService = inject(SubunidadService);
  areaService: AreaService = inject(AreaService);
  favoriteFramework: string ="";
  areaList: Area[] = [];
  subunidadList: Subunidad[] = [];
  filteredSubunidadList: Subunidad[]=[]
  selectedUnidad: string = "";
  constructor() {
    this.areaService.getAllAreas().then((areaList: Area[]) => {
      this.areaList = areaList;
    });
    this.subunidadService.getAllSubunidads().then((subunidadList: Subunidad[])=>{
      this.subunidadList = subunidadList;
      
    })
  }
  onAreaChange(codigoArea: string) {
    
    this.filteredSubunidadList = this.subunidadList.filter(subunidad => subunidad.codArea === parseInt(codigoArea));
    console.log("Esto es el filtro",this.filteredSubunidadList);
  }
  sendForm(): void {
    console.log(this.selectedUnidad); // Aquí puedes hacer lo que necesites con la subunidad seleccionada
  }
  filterResults(text: string) {
    if (!text) {this.filteredSubunidadList = this.subunidadList;
      return;
    }
    this.filteredSubunidadList = this.subunidadList.filter((subunidad) =>
      subunidad?.nombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];
    console.log("ESTO ES LO QUE ENVIAMOS",cuerpo);
    cuerpo["codUnidadPadre"] = cuerpo["codUnidadPadre"] ? parseInt(cuerpo["codUnidadPadre"], 10) : null;
    cuerpo["subUnidades"] = [cuerpo["subUnidades"]] ? parseInt(cuerpo["subUnidades"], 10) : [];

    //this.subunidadService.createSubunidad(form["value"]);
    fetch("http://localhost:5095/api/SubUnidad/Guardar", {
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
