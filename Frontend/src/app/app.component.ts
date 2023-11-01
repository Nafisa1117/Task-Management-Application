import { TaskService } from './task.service';
import { Component } from '@angular/core';
import { Task } from './task';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Management Application';

  tasks: Task[] = []; // Define the tasks property

  constructor(private taskService: TaskService) { // Inject the TaskService
  }

  searchTasks(searchTerm: string) {
    // Implement the logic to search for tasks with the given searchTerm.
    // You can call your service to fetch filtered tasks here.

    // For demonstration purposes, let's assume you have a task service with a method to search tasks.
    // Replace 'yourTaskService' and 'searchTasksByTerm' with your actual service and method names.
    this.taskService.searchTasksByTerm(searchTerm).subscribe((filteredTasks) => {
      // Handle the filtered tasks here, e.g., update a tasks array.
      this.tasks = filteredTasks;
    });
    }



}
