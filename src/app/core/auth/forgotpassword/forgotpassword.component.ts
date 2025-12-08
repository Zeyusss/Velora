import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  isLoading: boolean = false;
  step: number = 1;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });

    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }
  // Form Step 1 (verify Email)
  formStep1(): void {
    if (this.verifyEmail.valid) {
      this.isLoading = true;
      this.authService.postForgotPassword(this.verifyEmail.value).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            this.isLoading = false;
            this.toastrService.success(res.message);
            this.step = 2;
          }
        },
        error: (err) => {
          this.toastrService.error(err.message);
          this.isLoading = false;
        },
      });
    }
  }
  // Form Step 2 (verify code)
  formStep2(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true;
      this.authService.postVerifyResetCode(this.verifyCode.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.isLoading = false;
            this.toastrService.success('Correct Code');
            this.step = 3;
          }
        },
        error: (err) => {
          this.toastrService.error(err.message);
          this.isLoading = false;
        },
      });
    }
  }
  // Form Step 3 (reset Password)
  formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.putResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toastrService.success('Password Reseted');
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;

          console.log(err);
        },
      });
    }
  }
}
