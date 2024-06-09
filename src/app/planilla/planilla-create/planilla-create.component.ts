import { Component,inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { PlanillaService } from '../../services/planilla.service';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empleado } from '../../interfaces/empleado';
import { Empresa } from '../../interfaces/empresa';

@Component({
  selector: 'app-planilla-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './planilla-create.component.html',
  styleUrl: './planilla-create.component.css'
})
export class PlanillaCreateComponent {
  planillaService: PlanillaService = inject(PlanillaService);
  favoriteFramework: string ="";
  empleadoService: EmpleadoService = inject(EmpleadoService);
  empresaService: EmpresaService= inject(EmpresaService);
  empleadoList: Empleado[] = [];
  empresaList: Empresa[] =[];
  selectedUnidad: string = "";
  fecha: string = "";
  horasExtrasDiurnas: number = 0;
  horasNocturnas: number = 0;
  horasExtrasNocturnas: number =0;
  constructor() {
    
    this.empleadoService.getAllEmpleados().then((empleadoList: Empleado[])=>{
      this.empleadoList = empleadoList;
      
    })
    
    this.empresaService.getAllEmpresas().then((empresaList: Empresa[])=>{
      this.empresaList = empresaList;
      
    })
    
  }
  
  sendForm():void{
    console.log(this.favoriteFramework);
  }
  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    let cuerpo=form["value"];
    

    cuerpo["codEmpresa"]=parseInt(cuerpo["codEmpresa"]);
    cuerpo["codEmpleado"]=parseInt(cuerpo["codEmpleado"]);
    cuerpo["horasExtrasDiurnas"]=parseInt(cuerpo["horasExtrasDiurnas"]);
    cuerpo["horasExtrasNocturnas"]=parseInt(cuerpo["horasExtrasNocturnas"]);
    cuerpo["horasNocturnas"]=parseInt(cuerpo["horasNocturnas"]);
    console.log(cuerpo);
    //this.planillaService.createPlanilla(form["value"]);
    fetch("http://localhost:5095/api/Planilla/Guardar", {
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
