import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { PuestoService } from '../../services/puesto.service';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '../../interfaces/unidad';
import { Puesto } from '../../interfaces/puesto';
import { Area } from '../../interfaces/area';
import { AreaService } from '../../services/area.service';
import { SubunidadService } from '../../services/subunidad.service';
import { Subunidad } from '../../interfaces/subunidad';
import { Empresa } from '../../interfaces/empresa';
import { EmpresaService } from '../../services/empresa.service';


@Component({
  selector: 'app-puesto-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './puesto-create.component.html',
  styleUrl: './puesto-create.component.css'
})
export class PuestoCreateComponent {
  empresaService: EmpresaService = inject(EmpresaService);
  subunidadService: SubunidadService = inject(SubunidadService);
  favoriteFramework: string ="";
  subunidadList: Subunidad[] = [];
  puestoList: Puesto[] = [];
  empresaList: Empresa[] = [];
  filteredPuestoList: Puesto[]=[]
  selectedUnidad: string = "";
  constructor() {
    this.empresaService.getAllEmpresas().then((empresaList: Empresa[]) => {
      this.empresaList = empresaList;
    });
    this.subunidadService.getAllSubunidads().then((subunidadList: Subunidad[]) => {
      this.subunidadList = subunidadList;
    });

  }

  sendForm(): void {
    console.log(this.selectedUnidad); // Aquí puedes hacer lo que necesites con la puesto seleccionada
  }
  filterResults(text: string) {
    if (!text) {this.filteredPuestoList = this.puestoList;
      return;
    }
    this.filteredPuestoList = this.puestoList.filter((puesto) =>
      puesto?.nombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];
    console.log("ESTO ES LO QUE ENVIAMOS",cuerpo);
    cuerpo["codEmpresa"]=parseInt(cuerpo["codEmpresa"]);
    cuerpo["codSubunidad"]=parseInt(cuerpo["codSubunidad"]);

    //this.puestoService.createPuesto(form["value"]);
    fetch("http://localhost:5095/api/Puesto/Guardar", {
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
