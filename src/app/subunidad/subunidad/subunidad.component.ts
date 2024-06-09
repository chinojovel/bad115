import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subunidad} from '../../interfaces/subunidad';
import { SubunidadService } from '../../services/subunidad.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SubunidadCreateComponent } from '../subunidad-create/subunidad-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-subunidad',
  standalone: true,
  imports: [CommonModule,FormsModule,SubunidadCreateComponent,HeaderComponent],
  templateUrl: './subunidad.component.html',
  styleUrl: './subunidad.component.css'
})
export class SubunidadComponent {
  subunidadList: Subunidad[] = [];
  subunidadService: SubunidadService = inject(SubunidadService);
  filteredSubunidadList: Subunidad[] = [];

  constructor() {
    this.subunidadService.getAllSubunidads().then((subunidadList: Subunidad[]) => {
      this.subunidadList = subunidadList;
      this.filteredSubunidadList = subunidadList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredSubunidadList = this.subunidadList;
      return;
    }
    this.filteredSubunidadList = this.subunidadList.filter((subunidad) =>
      subunidad?.nombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, subunidad: Subunidad){
    let cuerpo=subunidad;
    //this.subunidadService.createSubunidad(form["value"]);
    fetch("http://localhost:5095/api/SubUnidad/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.subunidadList = this.subunidadList.filter(e => e.codigo !== subunidad.codigo);
          this.filteredSubunidadList = this.subunidadList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
