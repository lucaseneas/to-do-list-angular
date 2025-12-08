import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { AuthGuard } from './guard/authGuard';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
    { path: 'login', component: LoginPage },
    {
        path: 'home-page',
        component: HomePage,
        canActivate: [AuthGuard] // Protege a rota!
    },
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
