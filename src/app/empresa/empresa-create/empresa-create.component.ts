import { Component,inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './empresa-create.component.html',
  styleUrl: './empresa-create.component.css'
})
export class EmpresaCreateComponent {
  empresaService: EmpresaService = inject(EmpresaService);
  favoriteFramework: string ="";
  
  sendForm():void{
    console.log(this.favoriteFramework);
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];

    cuerpo["planillaMensual"] = (cuerpo["planillaMensual"]==="true");
    cuerpo["codMunicipio"]=parseInt(cuerpo["codMunicipio"]);
    console.log(cuerpo);
    //this.empresaService.createEmpresa(form["value"]);
    fetch("http://localhost:5095/api/Empresa/Guardar", {
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
