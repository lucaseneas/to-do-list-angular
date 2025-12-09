import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  url = "http://localhost:8080/auth/"
  private readonly _httpClient = inject(HttpClient)

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }



  login(userlogin: UserLogin) {
    return this._httpClient.post<LoginResponse>(this.url + "login", userlogin).pipe(
      tap((user) => {
        sessionStorage.setItem("token", user.token)
        sessionStorage.setItem("userId", user.userId)
        this.currentUserSubject.next(user);

      })
    );
  }
  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Verifica se existe token e se não está expirado
    return token != null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload)
      const expiry = payload.exp * 1000; // Converte para milissegundos
      return Date.now() > expiry;
    } catch (e) {
      return true;
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }


}
