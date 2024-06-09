import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Empresa} from '../../interfaces/empresa';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css'
})
export class EmpresaListComponent {
@Input() empresa!: Empresa;
}
