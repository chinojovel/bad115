import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Centro} from '../../interfaces/centro';
import { CentroService } from '../../services/centro.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CentroCreateComponent } from '../centro-create/centro-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-centro',
  standalone: true,
  imports: [CommonModule,FormsModule,CentroCreateComponent,HeaderComponent],
  templateUrl: './centro.component.html',
  styleUrl: './centro.component.css'
})
export class CentroComponent {
  centroList: Centro[] = [];
  centroService: CentroService = inject(CentroService);
  filteredCentroList: Centro[] = [];

  constructor() {
    this.centroService.getAllCentros().then((centroList: Centro[]) => {
      this.centroList = centroList;
      this.filteredCentroList = centroList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredCentroList = this.centroList;
      return;
    }
    this.filteredCentroList = this.centroList.filter((centro) =>
      String(centro?.codigo).includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, centro: Centro){
    let cuerpo=centro;
    //this.centroService.createCentro(form["value"]);
    fetch("http://localhost:5095/api/CentroCosto/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.centroList = this.centroList.filter(e => e.codigo !== centro.codigo);
          this.filteredCentroList = this.centroList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
