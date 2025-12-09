import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { AuthenticationService } from './services/authentication-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('to-do-list-angular');

  protected readonly isAuthenticated = signal(false);
  protected readonly isLoginPage = signal(false);

  private readonly _authService = inject(AuthenticationService);
  private readonly _router = inject(Router);

  constructor() {
    this.isAuthenticated.set(this._authService.isAuthenticated());
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage.set(event.url === '/login');
      }
    });
  }
}
