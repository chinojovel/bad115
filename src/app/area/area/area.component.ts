import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Area} from '../../interfaces/area';
import { AreaService } from '../../services/area.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AreaCreateComponent } from '../area-create/area-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [CommonModule,FormsModule,AreaCreateComponent,HeaderComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent {
  areaList: Area[] = [];
  areaService: AreaService = inject(AreaService);
  filteredAreaList: Area[] = [];

  constructor() {
    this.areaService.getAllAreas().then((areaList: Area[]) => {
      this.areaList = areaList;
      this.filteredAreaList = areaList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredAreaList = this.areaList;
      return;
    }
    this.filteredAreaList = this.areaList.filter((area) =>
      area?.nombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, area: Area){
    let cuerpo=area;
    //this.areaService.createArea(form["value"]);
    fetch("http://localhost:5095/api/Area/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.areaList = this.areaList.filter(e => e.codigo !== area.codigo);
          this.filteredAreaList = this.areaList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
