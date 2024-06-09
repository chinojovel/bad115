import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet, RouterLinkActive, RouterLink} from '@angular/router';
import { NavigationDrawerComponent  } from './navigation-drawer/navigation-drawer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink, RouterLinkActive, NavigationDrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bad115';
 
}
