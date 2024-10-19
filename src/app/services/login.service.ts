import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly TOKEN_KEY = 'my_app_token';
  private isBrowser: boolean;
  private apiUrl = 'http://localhost:3000/login';
  private token: string | null = null;
 

  private userName: string = '';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(userName: string, password: string): Observable<any> {
    const body = { userName, password };
    return this.http.post(`${this.apiUrl}`, body).pipe(
      tap((response: any) => {
        if (response && response.token && this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem('userName', userName);
          
        } else {
          this.token = response.token;
        }
        this.userName = userName;
      })
    );
  }
  
  


  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return this.token;
  }
  getUserName(): string {
    if (this.isBrowser) {
      return localStorage.getItem('userName') || '';
    }
    return this.userName;
  }
  

  clearToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('userName');
  }
  this.token = null;
  this.userName = '';
  }

 
  
}