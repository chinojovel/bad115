import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Empleado} from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoCreateComponent } from '../empleado-create/empleado-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule,FormsModule,EmpleadoCreateComponent,HeaderComponent],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  empleadoList: Empleado[] = [];
  empleadoService: EmpleadoService = inject(EmpleadoService);
  filteredEmpleadoList: Empleado[] = [];

  constructor() {
    this.empleadoService.getAllEmpleados().then((empleadoList: Empleado[]) => {
      this.empleadoList = empleadoList;
      this.filteredEmpleadoList = empleadoList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredEmpleadoList = this.empleadoList;
      return;
    }
    this.filteredEmpleadoList = this.empleadoList.filter((empleado) =>
      empleado?.primerNombre.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, empleado: Empleado){
    let cuerpo=empleado;
    //this.empleadoService.createEmpleado(form["value"]);
    fetch("http://localhost:5095/api/Empleado/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.empleadoList = this.empleadoList.filter(e => e.codigo !== empleado.codigo);
          this.filteredEmpleadoList = this.empleadoList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
