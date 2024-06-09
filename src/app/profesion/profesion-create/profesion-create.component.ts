import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { ProfesionService } from '../../services/profesion.service';


@Component({
  selector: 'app-profesion-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './profesion-create.component.html',
  styleUrl: './profesion-create.component.css'
})
export class ProfesionCreateComponent {
  profesionService: ProfesionService = inject(ProfesionService);
  favoriteFramework: string ="";
  
  sendForm():void{
    console.log(this.favoriteFramework);
  }
  onSubmit(form: NgForm){
    let cuerpo=form["value"];

    //this.profesionService.createProfesion(form["value"]);
    fetch("http://localhost:5095/api/ProfesionOficio/Guardar", {
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