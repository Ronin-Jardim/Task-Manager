import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/register/user';

  constructor(private http: HttpClient, private route: Router) {}

  register(user: any) {
  
    return this.http.post(this.apiUrl, user);
  }
 
}
