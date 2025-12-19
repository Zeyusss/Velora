import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  wishListItems: BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToWishList(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/wishlist`, {
      productId: productId,
    });
  }
  removeProductFromWishList(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/wishlist/${productId}`);
  }
  getLoggedInUserWish(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/wishlist`);
  }
}
