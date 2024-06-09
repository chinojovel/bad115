import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationDrawerComponent } from '../navigation-drawer/navigation-drawer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, NavigationDrawerComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription = new Subscription();
  isAuthenticated = false;
  isAdmin = false;
  systemTime : string ="";
  intervalId: any;
  correo: string | null = null;
  rol: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  cerrar():void{
    sessionStorage.removeItem("correo");
    sessionStorage.removeItem("rol");
    this.isAuthenticated=false;
    this.correo="";
    this.rol="";
    this.isAdmin=false;
    this.router.navigate(['/']);
  }  
  ngOnInit(): void {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-11
    const year = currentDate.getFullYear();
    this.systemTime = `${day}/${month}/${year}`;
    this.correo=sessionStorage.getItem("correo");
    this.rol=sessionStorage.getItem("rol");
    
    if(this.correo){
      console.log(this.rol);
      if(this.rol=="Administrator")
      {
        console.log("Entra");
        this.isAdmin=true;
      }
        this.isAuthenticated=true;
    }
    else{
        this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
