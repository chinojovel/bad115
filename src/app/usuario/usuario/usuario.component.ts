import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Usuario} from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule,FormsModule,UsuarioCreateComponent,HeaderComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  usuarioList: Usuario[] = [];
  usuarioService: UsuarioService = inject(UsuarioService);
  filteredUsuarioList: Usuario[] = [];

  constructor() {
    this.usuarioService.getAllUsuarios().then((usuarioList: Usuario[]) => {
      this.usuarioList = usuarioList;
      this.filteredUsuarioList = usuarioList;
    });
  }
  filterResults(text: string) {
    if (!text) {this.filteredUsuarioList = this.usuarioList;
      return;
    }
    this.filteredUsuarioList = this.usuarioList.filter((usuario) =>
      usuario?.correo?.toLowerCase().includes(text.toLowerCase()),
    );
  }
  onSubmitDelete(form: NgForm, usuario: Usuario){
    let cuerpo=usuario;
    //this.usuarioService.createUsuario(form["value"]);
    fetch("http://localhost:5095/api/Usuario/Eliminar", {method: 'DELETE',  headers: {
          'Content-Type': 'application/json',
          },
      body: JSON.stringify(cuerpo), // Cuerpo de la solicitud, sólo para POST o PUT
      })
      .then(response => response.json())
      .then(data => {
          console.log('Éxito:', data);
          this.usuarioList = this.usuarioList.filter(e => e.codigo !== usuario.codigo);
          this.filteredUsuarioList = this.usuarioList;

        // Llamar a filterResults para actualizar la lista
        this.filterResults('');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }


}
