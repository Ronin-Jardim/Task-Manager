import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: { userName: string; password: string } = { userName: '', password: '' };

  username: string = '';
  password: string = '';  

  constructor(private registerService: RegisterService, private router: Router) {}
  onRegisterSuccess() {
    
    this.router.navigate(['/login']);
  }

  registerUser() {
    
 
    this.registerService.register({
      userName: this.username,
      password: this.password
    }).subscribe(
      (response) => {
       
        
        this.onRegisterSuccess();
      },
      (error) => {
        console.error('Error registering user:', error);
      
      }
    );
  }
}
