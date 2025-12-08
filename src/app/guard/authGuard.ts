import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    _router = inject(Router)
    _authService = inject(AuthenticationService)

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {

        if (this._authService.isAuthenticated()) {
            return true; // Permite acesso
        }

        // Redireciona para login se não estiver autenticado
        this._router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
        });
        return false;
    }
}