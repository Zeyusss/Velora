import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductResponse } from '../../models/products/product-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${environment.baseUrl}/products`);
  }
}
