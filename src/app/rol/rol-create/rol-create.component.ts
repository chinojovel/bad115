import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'app-rol-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './rol-create.component.html',
  styleUrl: './rol-create.component.css'
})
export class RolCreateComponent {
  rolService: RolService = inject(RolService);
  favoriteFramework: string ="";
  
  sendForm():void{
    console.log(this.favoriteFramework);
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];

    //this.rolService.createRol(form["value"]);
    fetch("http://localhost:5095/api/Rol/Guardar", {
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