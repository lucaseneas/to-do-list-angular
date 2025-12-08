import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = "http://localhost:8080/auth/"
  private readonly _httpClient = inject(HttpClient)

  login(userlogin: UserLogin) {
    return this._httpClient.post<LoginResponse>(this.url + "login", userlogin).pipe(
      tap((value) => {
        sessionStorage.setItem("token", value.token)
        sessionStorage.setItem("userId", value.userId)
      })
    );
  }
}
