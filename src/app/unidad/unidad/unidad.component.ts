import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Unidad} from '../../interfaces/unidad';
import { UnidadService } from '../../services/unidad.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UnidadCreateComponent } from '../unidad-create/unidad-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [CommonModule,FormsModule,UnidadCreateComponent,HeaderComponent],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css'
})
export class UnidadComponent {
  unidadList: Unidad[] = [];
  unidadService: UnidadService = inject(UnidadService);
  filteredUnidadList: Unidad[] = [];

  constructor() {
    this.unidadService.getAllUnidads().then((unidadList: Unidad[]) => {
      this.unidadList = unidadList;
      this.filteredUnidadList = unidadList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredUnidadList = this.unidadList;
      return;
    }
    this.filteredUnidadList = this.unidadList.filter((unidad) =>
      unidad?.nombre?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, unidad: Unidad){
    let cuerpo=unidad;
    //this.unidadService.createUnidad(form["value"]);
    fetch("http://localhost:5095/api/DptoUnidad/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.unidadList = this.unidadList.filter(e => e.codigo !== unidad.codigo);
          this.filteredUnidadList = this.unidadList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
