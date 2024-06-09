import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '../../interfaces/unidad';
import { Empleado } from '../../interfaces/empleado';
import { Area } from '../../interfaces/area';
import { AreaService } from '../../services/area.service';
import { Sexo } from '../../interfaces/sexo';
import { SexoService } from '../../services/sexo.service';
import { Estado } from '../../interfaces/estado';
import { EstadoService } from '../../services/estado.service';
import { Profesion } from '../../interfaces/profesion';
import { ProfesionService } from '../../services/profesion.service';
import { MunicipioService } from '../../services/municipio.service';
import { Municipio } from '../../interfaces/municipio';
import { EmpresaService } from '../../services/empresa.service';
import { PuestoService } from '../../services/puesto.service';
import { Empresa } from '../../interfaces/empresa';
import { Puesto } from '../../interfaces/puesto';


@Component({
  selector: 'app-empleado-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './empleado-create.component.html',
  styleUrl: './empleado-create.component.css'
})
export class EmpleadoCreateComponent {
  empleadoService: EmpleadoService = inject(EmpleadoService);
  sexoService: SexoService = inject(SexoService);
  estadoService: EstadoService = inject(EstadoService);
  profesionService: ProfesionService= inject(ProfesionService);
  municipioService: MunicipioService= inject(MunicipioService);
  empresaService: EmpresaService= inject(EmpresaService);
  puestoService: PuestoService= inject(PuestoService);
  sexoList: Sexo[] = [];
  estadoList: Estado[] = [];
  profesionList: Profesion[] =[];
  municipioList: Municipio[] =[];
  empleadoList: Empleado[] = [];
  empresaList: Empresa[] =[];
  puestoList: Puesto[] =[];
  filteredEmpleadoList: Empleado[]=[];
  selectedUnidad: string = "";
  constructor() {
    this.estadoService.getAllEstados().then((estadoList: Estado[]) => {
      this.estadoList = estadoList;
    });

    this.sexoService.getAllSexos().then((sexoList: Sexo[]) => {
      this.sexoList = sexoList;
    });
    this.empleadoService.getAllEmpleados().then((empleadoList: Empleado[])=>{
      this.empleadoList = empleadoList;
      
    })
    this.municipioService.getAllMunicipios().then((municipioList: Municipio[])=>{
      this.municipioList = municipioList;
      
    })
    this.profesionService.getAllProfesions().then((profesionList: Profesion[])=>{
      this.profesionList = profesionList;
      
    })
    
    this.empresaService.getAllEmpresas().then((empresaList: Empresa[])=>{
      this.empresaList = empresaList;
      
    })
    this.puestoService.getAllPuestos().then((puestoList: Puesto[])=>{
      this.puestoList = puestoList;  
    })
  }

  sendForm(): void {
    console.log(this.selectedUnidad); // Aquí puedes hacer lo que necesites con la empleado seleccionada
  }
  filterResults(text: string) {
    if (!text) {this.filteredEmpleadoList = this.empleadoList;
      return;
    }
    this.filteredEmpleadoList = this.empleadoList.filter((empleado) =>
      empleado?.primerNombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];
    console.log("ESTO ES LO QUE ENVIAMOS",cuerpo);
    cuerpo["codProfesion"] = cuerpo["codProfesion"] ? parseInt(cuerpo["codProfesion"], 10) : null;
    cuerpo["codEstadoCivil"] = [cuerpo["codEstadoCivil"]] ? parseInt(cuerpo["codEstadoCivil"], 10) : null;
    cuerpo["codMunicipio"] = cuerpo["codMunicipio"] ? parseInt(cuerpo["codMunicipio"], 10) : null;
    cuerpo["codEmpresa"] = [cuerpo["codEmpresa"]] ? parseInt(cuerpo["codEmpresa"], 10) : null;
    cuerpo["codPuesto"] = cuerpo["codPuesto"] ? parseInt(cuerpo["codPuesto"], 10) : null;
    cuerpo["codSexo"] = cuerpo["codSexo"] ? parseInt(cuerpo["codSexo"], 10) : null;
    cuerpo["codJefe"] = cuerpo["codJefe"] ? parseInt(cuerpo["codJefe"], 10) : null;
    cuerpo["empleados"] = [cuerpo["empleados"]] ? parseInt(cuerpo["empleados"], 10) : [];

    //this.empleadoService.createEmpleado(form["value"]);
    fetch("http://localhost:5095/api/Empleado/Guardar", {
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
