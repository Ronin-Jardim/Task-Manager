import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  logOut(){
    this.loginService.clearToken();
    alert('Logged Out')
    this.router.navigate(['/login']);

  }
}
