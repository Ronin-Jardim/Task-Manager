
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { defaultTask, Task } from '../interface/task';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.css'
})
export class ShowTasksComponent implements OnInit {
  @Input() tasks: Task[] = [];
  editingTask: Task = defaultTask;
  task : { taskName: string, description: string, _id: string, userId: string} = {taskName: '', description: '', _id: '', userId: ''};
  
constructor(private taskService: TaskService, private loginService : LoginService){}

ngOnInit(){
  this.taskService.tasks$.subscribe(tasks => {
  this.tasks = tasks;})
  this.getAllTasks();
  
}

addNewTask() {
 
this.taskService.addTask({
  taskName: this.task.taskName,
  description: this.task.description,
  _id: this.task._id,
  userId: this.task.userId
  }).subscribe(
  (response: any) => {
  if (response && response.data) {
  this.tasks.push(response.data); 
  this.getAllTasks()   
  this.task = {taskName: '', description: '', _id: '',userId: ''};
  }
  },
  (error) => {
  console.error('Error adding task:', error);
     
  }
 );

}

getAllTasks(): void {
 
  this.taskService.getTasks().subscribe(
  (tasks) => {  
  tasks.forEach(task => {   
  });
  this.tasks = tasks;
  },
  (error) => {
  console.error('Error fetching tasks:', error);
  }
  );
}

deleteTask(taskId: string): void {
  this.taskService.deleteTask(taskId).subscribe(
  () => {
          
  this.tasks = this.tasks.filter(task => task._id !== taskId);
  this.getAllTasks();
  },
  (error) => {
  console.error('Error deleting task:', error);
  }
  );
}

startEditing(task: any) {
  this.editingTask = { ...task };
}

saveTask() {
  if (this.editingTask && this.editingTask._id) {
   
  this.taskService.updateTask(this.editingTask._id, this.editingTask).subscribe(
  (updatedTask: Task) => {
       
  const index = this.tasks.findIndex(t => t._id === updatedTask._id);
  if (index !== -1)
  {
  this.tasks[index] = updatedTask;
  }
  this.editingTask = defaultTask;
  this.getAllTasks(); 
  },
  (error) => 
  {
  console.error('Error updating task:', error);
  }
  );
  } else 
  {
    console.error('No task selected for editing');
  }
}

cancelEdit() {
  this.editingTask = defaultTask;
  this.getAllTasks()
}
}