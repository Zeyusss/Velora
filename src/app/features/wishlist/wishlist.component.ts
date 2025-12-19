import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Wishlist } from './model/wishlist.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  wishList: Wishlist[] = [];
  isWishlisted: boolean = false;

  ngOnInit(): void {
    this.getLoggedInUserWishList();
  }

  getLoggedInUserWishList(): void {
    this.wishlistService.getLoggedInUserWish().subscribe({
      next: (res) => {
        this.wishList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeProductFromWishList(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.error(res.message);
          this.getLoggedInUserWishList();
          this.wishlistService.wishListItems.next(res.data.length);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message);
      },
    });
  }
  FromWishListToCart(productId: string): void {
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
}
