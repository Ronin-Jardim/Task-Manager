import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user : { userName: string, password: string} = {userName: '', password: ''};

  constructor(private loginService: LoginService,private taskService: TaskService , private router: Router) {}

loginUser() {
  if (!this.user.userName || !this.user.password) {
    console.error('Username and password are required');
    return;
  }
  this.loginService.login(this.user.userName, this.user.password,).subscribe(
    (response) => {
      
      
      this.router.navigate(['/home']); 
    },
    (error) => {
      console.error('Error during login:', error);
    
    }
  );
}



}
