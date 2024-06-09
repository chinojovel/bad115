import { Component,inject, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { PermisoService } from '../../services/permiso.service';


@Component({
  selector: 'app-permiso-create',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './permiso-create.component.html',
  styleUrl: './permiso-create.component.css'
})
export class PermisoCreateComponent {
  permisoService: PermisoService = inject(PermisoService);
  favoriteFramework: string ="";
  
  sendForm():void{
    console.log(this.favoriteFramework);
  }
  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    let cuerpo=form["value"];

    //this.permisoService.createPermiso(form["value"]);
    fetch("http://localhost:5095/api/Permiso/Guardar", {
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
