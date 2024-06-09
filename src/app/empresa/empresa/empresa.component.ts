import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Empresa} from '../../interfaces/empresa';
import { EmpresaService } from '../../services/empresa.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpresaCreateComponent } from '../empresa-create/empresa-create.component';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule,FormsModule,EmpresaCreateComponent,HeaderComponent],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {
  empresaList: Empresa[] = [];
  empresaService: EmpresaService = inject(EmpresaService);
  filteredEmpresaList: Empresa[] = [];

  constructor() {
    this.empresaService.getAllEmpresas().then((empresaList: Empresa[]) => {
      this.empresaList = empresaList;
      this.filteredEmpresaList = empresaList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredEmpresaList = this.empresaList;
      return;
    }
    this.filteredEmpresaList = this.empresaList.filter((empresa) =>
      empresa?.nombre?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, empresa: Empresa){
    let cuerpo=empresa;
    //this.empresaService.createEmpresa(form["value"]);
    fetch("http://localhost:5095/api/Empresa/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.empresaList = this.empresaList.filter(e => e.codigo !== empresa.codigo);
          this.filteredEmpresaList = this.empresaList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

}
