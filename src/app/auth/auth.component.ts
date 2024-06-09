import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'auth-path',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: true,
  imports: [FormsModule,CommonModule],  // Importaciones necesarias
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  errorMessage: string = '';

  onSubmit(form: NgForm) {
    const correo: string = form.value.correo;
    const contrasena: string = form.value.contrasena;
    const user = { correo: correo, contrasena: contrasena };
    this.authService.login(user).subscribe((data) => {
      this.authService.setRol(data.value.nombreRol);
      this.authService.setCorreo(data.value.correo);
      this.authService.updateUser({ correo: data.value.correo, rol: data.value.nombreRol });
      console.log("Login success data:", data);
      this.router.navigate(['/centros']);
    }, (error) => { // Manejar el error en caso de fallo
      console.error("Login error:", error);
      this.errorMessage = 'Error: Nombre de usuario o contraseña incorrectos'; // Mensaje de error
    });
  }
}
