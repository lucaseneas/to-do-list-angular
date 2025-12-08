import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly _authenticationService = inject(AuthenticationService);
  private readonly _router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  loginRequest() {
    this._authenticationService.login(this.loginForm.value as UserLogin)
      .subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this._router.navigate(['/home-page'])
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      })
  }

}
