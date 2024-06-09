import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Puesto} from '../../interfaces/puesto';
import { PuestoService } from '../../services/puesto.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PuestoCreateComponent } from '../puesto-create/puesto-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-puesto',
  standalone: true,
  imports: [CommonModule,FormsModule,PuestoCreateComponent,HeaderComponent],
  templateUrl: './puesto.component.html',
  styleUrl: './puesto.component.css'
})
export class PuestoComponent {
  puestoList: Puesto[] = [];
  puestoService: PuestoService = inject(PuestoService);
  filteredPuestoList: Puesto[] = [];

  constructor() {
    this.puestoService.getAllPuestos().then((puestoList: Puesto[]) => {
      this.puestoList = puestoList;
      this.filteredPuestoList = puestoList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredPuestoList = this.puestoList;
      return;
    }
    this.filteredPuestoList = this.puestoList.filter((puesto) =>
      puesto?.nombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, puesto: Puesto){
    let cuerpo=puesto;
    //this.puestoService.createPuesto(form["value"]);
    fetch("http://localhost:5095/api/Puesto/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.puestoList = this.puestoList.filter(e => e.codigo !== puesto.codigo);
          this.filteredPuestoList = this.puestoList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
