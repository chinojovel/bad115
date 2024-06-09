import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Rol} from '../../interfaces/rol';
import { RolService } from '../../services/rol.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RolCreateComponent } from '../rol-create/rol-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule,FormsModule,RolCreateComponent,HeaderComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css'
})
export class RolComponent {
  rolList: Rol[] = [];
  rolService: RolService = inject(RolService);
  filteredRolList: Rol[] = [];

  constructor() {
    this.rolService.getAllRols().then((rolList: Rol[]) => {
      this.rolList = rolList;
      this.filteredRolList = rolList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredRolList = this.rolList;
      return;
    }
    this.filteredRolList = this.rolList.filter((rol) =>
      rol?.nombre?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, rol: Rol){
    let cuerpo=rol;
    //this.rolService.createRol(form["value"]);
    fetch("http://localhost:5095/api/Rol/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.rolList = this.rolList.filter(e => e.codigo !== rol.codigo);
          this.filteredRolList = this.rolList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
