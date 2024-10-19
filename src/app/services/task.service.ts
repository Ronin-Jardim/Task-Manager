
import { Injectable } from '@angular/core';
import {  Task } from '../interface/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
private tasksSource = new BehaviorSubject<Task[]>([]);
tasks$ = this.tasksSource.asObservable();

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  addTask(task: { taskName: string; description: string; _id: string, userId: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/display`);
  }

  deleteTask(taskId: string): Observable<void> {
    const url = `${this.apiUrl}/tasks/delete/${taskId}`;
    return this.http.delete<void>(url);
  };

  updateTask(taskId: string, updatedTask: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/update/${taskId}`, updatedTask);
  }
  
  clearTasks() {
    this.tasksSource.next([]);
  }
  

  

}
