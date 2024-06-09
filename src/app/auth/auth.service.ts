import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject = new Subject<any>();
  user = this.userSubject.asObservable();

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post("http://localhost:5095/api/Usuario/IniciarSesion", user).pipe(
      tap((data: any) => {
        console.log("Login response data:", data);
        this.setRol(data.value.nombreRol);
        this.setCorreo(data.value.correo);
        this.updateUser({ correo: data.value.correo, rol: data.value.nombreRol });
        sessionStorage.setItem('correo',data.value.correo);
        sessionStorage.setItem('rol',data.value.nombreRol);
      })
    );
  }

  setRol(rol: string) {
    this.cookies.set("rol", rol);
  }

  getRol() {
    return this.cookies.get("rol");
  }

  setCorreo(correo: string) {
    this.cookies.set("correo", correo);
  }

  getCorreo() {
    return this.cookies.get("correo");
  }

  updateUser(user: any) {
    console.log("Updating user in AuthService:", user); // Agregar este log para verificar que se actualiza el usuario
    this.userSubject.next(user);
  }
}
