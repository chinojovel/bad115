import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Planilla} from '../../interfaces/planilla';
import { PlanillaService } from '../../services/planilla.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PlanillaCreateComponent } from '../planilla-create/planilla-create.component';
import { Empleado } from '../../interfaces/empleado';
import { Empresa } from '../../interfaces/empresa';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpresaService } from '../../services/empresa.service';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-planilla',
  standalone: true,
  imports: [CommonModule,FormsModule,PlanillaCreateComponent,HeaderComponent],
  templateUrl: './planilla.component.html',
  styleUrl: './planilla.component.css'
})
export class PlanillaComponent {
  empleadoService: EmpleadoService = inject(EmpleadoService);
  empresaService: EmpresaService= inject(EmpresaService);
  planillaList: Planilla[] = [];
  planillaService: PlanillaService = inject(PlanillaService);
  filteredPlanillaList: Planilla[] = [];
  empleadoList: Empleado[] = [];
  empresaList: Empresa[] =[];
  showForm: boolean = false;
  mostrarDiv: boolean = true;
  formData: any = {};
  constructor() {
    this.planillaService.getAllPlanillas().then((planillaList: Planilla[]) => {
      this.planillaList = planillaList;
      this.filteredPlanillaList = planillaList;
    });
    
  }
  filterResults(text: string) {
    if (!text) {this.filteredPlanillaList = this.planillaList;
      return;
    }
    this.filteredPlanillaList = this.planillaList.filter((planilla) =>
      planilla?.nombreEmpleado?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitEdit(form: NgForm, planilla: Planilla){
    this.mostrarDiv = false;
    this.showForm = true;
    this.formData = planilla;
  }
  submitHiddenForm(form: NgForm){
    let cuerpo=form["value"];
    

    cuerpo["codigo"]=parseInt(cuerpo["codigo"]);
    cuerpo["horasExtrasDiurnas"]=parseInt(cuerpo["horasExtrasDiurnas"]);
    cuerpo["horasExtrasNocturnas"]=parseInt(cuerpo["horasExtrasNocturnas"]);
    cuerpo["horasNocturnas"]=parseInt(cuerpo["horasNocturnas"]);
    console.log(cuerpo);
    //this.planillaService.createPlanilla(form["value"]);
    fetch("http://localhost:5095/api/Planilla/Editar", {
      method: 'PUT', // o 'GET' si es una solicitud GET
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
      this.mostrarDiv = true;
      this.showForm = false;
      this.filterResults('');
  }
  onSubmitDelete(form: NgForm, planilla: Planilla){
    let cuerpo=planilla;
    //this.planillaService.createPlanilla(form["value"]);
    fetch("http://localhost:5095/api/Planilla/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.planillaList = this.planillaList.filter(e => e.codigo !== planilla.codigo);
          this.filteredPlanillaList = this.planillaList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

}