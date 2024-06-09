import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { UnidadService } from '../../services/unidad.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/empresa';


@Component({
  selector: 'app-unidad-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './unidad-create.component.html',
  styleUrl: './unidad-create.component.css'
})
export class UnidadCreateComponent {
  unidadService: UnidadService = inject(UnidadService);
  empresaService: EmpresaService = inject(EmpresaService);
  favoriteFramework: string ="";
  empresaList: Empresa[] = [];
  selectedEmpresa: string = "";
  constructor() {
    this.empresaService.getAllEmpresas().then((empresaList: Empresa[]) => {
      this.empresaList = empresaList;
    });
  }
  sendForm(): void {
    console.log(this.selectedEmpresa); // Aquí puedes hacer lo que necesites con la unidad seleccionada
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];
    console.log(cuerpo)

    //this.unidadService.createUnidad(form["value"]);
    fetch("http://localhost:5095/api/DptoUnidad/Guardar", {
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
