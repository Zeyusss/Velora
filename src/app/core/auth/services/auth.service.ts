import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  // Auth
  postSignUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signup`, data);
  }
  postSignIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/signin`, data);
  }
  // SignOut Func
  signOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  // Reset Password
  postForgotPassword(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/forgotPasswords`, data);
  }
  postVerifyResetCode(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/auth/verifyResetCode`, data);
  }
  putResetPassword(data: object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/auth/resetPassword`, data);
  }
}
