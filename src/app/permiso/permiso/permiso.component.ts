import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Permiso} from '../../interfaces/permiso';
import { PermisoService } from '../../services/permiso.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PermisoCreateComponent } from '../permiso-create/permiso-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-permiso',
  standalone: true,
  imports: [CommonModule,FormsModule,PermisoCreateComponent,HeaderComponent],
  templateUrl: './permiso.component.html',
  styleUrl: './permiso.component.css'
})
export class PermisoComponent {
  permisoList: Permiso[] = [];
  permisoService: PermisoService = inject(PermisoService);
  filteredPermisoList: Permiso[] = [];

  constructor() {
    this.permisoService.getAllPermisos().then((permisoList: Permiso[]) => {
      this.permisoList = permisoList;
      this.filteredPermisoList = permisoList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredPermisoList = this.permisoList;
      return;
    }
    this.filteredPermisoList = this.permisoList.filter((permiso) =>
      permiso?.nombre?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, permiso: Permiso){
    let cuerpo=permiso;
    //this.permisoService.createPermiso(form["value"]);
    fetch("http://localhost:5095/api/Permiso/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.permisoList = this.permisoList.filter(e => e.codigo !== permiso.codigo);
          this.filteredPermisoList = this.permisoList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
