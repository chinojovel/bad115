import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/empresa';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../interfaces/empleado';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../interfaces/rol';


@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.css'
})
export class UsuarioCreateComponent {
  usuarioService: UsuarioService = inject(UsuarioService);
  empleadoService: EmpleadoService = inject(EmpleadoService);
  empleadoList: Empleado[] = [];
  rolService: RolService = inject(RolService);
  rolList: Rol[] = [];
  selectedEmpresa: string = "";
  constructor() {
    this.empleadoService.getAllEmpleados().then((empleadoList: Empleado[]) => {
      this.empleadoList = empleadoList;
    });
    this.rolService.getAllRols().then((rolList: Rol[]) => {
      this.rolList = rolList;
    });
  }
  sendForm(): void {
    console.log(this.selectedEmpresa); // Aquí puedes hacer lo que necesites con la usuario seleccionada
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];
    cuerpo["codRol"] = parseInt(cuerpo["codRol"]);
    cuerpo["codEmpleado"] = parseInt(cuerpo["codEmpleado"]);
    console.log(cuerpo)

    //this.usuarioService.createUsuario(form["value"]);
    fetch("http://localhost:5095/api/Usuario/Guardar", {
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
