import { FlowbiteService } from './../../../core/services/flowbite/flowbite.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductObject } from '../../../core/models/products/product-object.interface';
import { TermPipe } from '../../pipes/term/term-pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-card',
  imports: [TermPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  isWishlisted: boolean = false;
  @Input() product!: ProductObject;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  addProductToCart(productId: string): void {
    this.cartService.postAddProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
          this.cartService.countNumber.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message);
      },
    });
  }
  toggleWishlist(productId: string): void {
    if (!this.isWishlisted) {
      this.wishlistService.addProductToWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.isWishlisted = true;
            this.toastrService.success(res.message);
            this.wishlistService.wishListItems.next(res.data.length);
          }
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.message);
        },
      });
    } else {
      this.wishlistService.removeProductFromWishList(productId).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.isWishlisted = false;
            this.toastrService.error(res.message);
            this.wishlistService.wishListItems.next(res.data.length);
          }
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.message);
        },
      });
    }
  }
}
