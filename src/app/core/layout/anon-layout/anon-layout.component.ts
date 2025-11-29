import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-anon-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './anon-layout.component.html',
  styleUrl: './anon-layout.component.css',
})
export class AnonLayoutComponent {}
