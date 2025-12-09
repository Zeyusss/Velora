import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);

  count!: number;

  @Input({ required: true }) isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.id)) {
      this.getAllDataCart();
    }
    this.getCartNumber();
  }

  getCartNumber(): void {
    this.cartService.countNumber.subscribe({
      next: (value) => {
        this.count = value;
      },
    });
  }

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  signOut(): void {
    this.authService.signOut();
  }
}
