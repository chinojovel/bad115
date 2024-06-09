import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Profesion} from '../../interfaces/profesion';
import { ProfesionService } from '../../services/profesion.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfesionCreateComponent } from '../profesion-create/profesion-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-profesion',
  standalone: true,
  imports: [CommonModule,FormsModule,ProfesionCreateComponent,HeaderComponent],
  templateUrl: './profesion.component.html',
  styleUrl: './profesion.component.css'
})
export class ProfesionComponent {
  profesionList: Profesion[] = [];
  profesionService: ProfesionService = inject(ProfesionService);
  filteredProfesionList: Profesion[] = [];

  constructor() {
    this.profesionService.getAllProfesions().then((profesionList: Profesion[]) => {
      this.profesionList = profesionList;
      this.filteredProfesionList = profesionList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredProfesionList = this.profesionList;
      return;
    }
    this.filteredProfesionList = this.profesionList.filter((profesion) =>
      profesion?.nombre?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, profesion: Profesion){
    let cuerpo=profesion;
    //this.profesionService.createProfesion(form["value"]);
    fetch("http://localhost:5095/api/ProfesionOficio/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.profesionList = this.profesionList.filter(e => e.codigo !== profesion.codigo);
          this.filteredProfesionList = this.profesionList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
