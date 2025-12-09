import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly _authService = inject(AuthenticationService);
  private readonly _router = inject(Router);
  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
