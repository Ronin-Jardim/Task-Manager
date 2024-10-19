import { Component, OnInit } from '@angular/core';
import { Task } from '../interface/task';
import { LoginService } from '../services/login.service';
import { ShowTasksComponent } from '../show-tasks/show-tasks.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tasks: Task[] = [];
  userName: string = '';
  constructor( private loginService: LoginService){}
  ngOnInit(){
   
    this.userName = this.loginService.getUserName();
    
  }
}
