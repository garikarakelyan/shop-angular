import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(
    private http: HttpClient,
    ) { }

  login(user) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    );
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000);
      this.isLoggedIn = true;
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date > expDate) {
        this.logout();
        return;
    }
    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuth() {
    return !!this.token;
  }
}
