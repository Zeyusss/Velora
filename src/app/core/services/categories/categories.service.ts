import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CategoriesResponse } from '../../models/categories/categories-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);

  getCategories(): Observable<CategoriesResponse> {
    return this.httpClient.get<CategoriesResponse>(`${environment.baseUrl}/categories`);
  }
}
