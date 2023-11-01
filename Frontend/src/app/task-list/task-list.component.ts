import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

 tasks : Task[]=[];
 selectedCategory: string = ''; // Selected category for filtering
 //selectedPriority: string = ''; // Initialize selectedPriority
 searchResults: any[] = [];

 constructor(private taskService: TaskService, private httpClient: HttpClient){}

//  ngOnInit(): void {
//    this.taskService.getTasks().subscribe(tasks => {
//     this.tasks = tasks;

//    });
//  }



ngOnInit(): void {
  this.getTasks();
}

getTasks(): void {
  this.taskService.getTasks().subscribe((tasks) => {
    this.tasks = tasks;

  });

}

filterTasks(): void {
  // Filter tasks based on the selected category
  if (this.selectedCategory === '') {
    // If 'All' is selected, show all tasks
    this.getTasks();
  } else {
    // Filter tasks by category
    this.taskService.getTasksByCategory(this.selectedCategory).subscribe((filteredTasks) => {
      this.tasks = filteredTasks;
    });
  }
}

// filterTasksByPriority(): void {
//   // Filter tasks based on the selected priority
//   if (this.selectedPriority === '') {
//     // If 'All' is selected, show all tasks
//     this.getTasks();
//   } else {
//     // Filter tasks by priority
//     this.taskService.getTasksByPriority(this.selectedPriority).subscribe((filteredTasks) => {
//       this.tasks = filteredTasks;
//     });
//   }
// }


getPriorityClass(priority: string): string {
  switch (priority) {
    case 'High':
      return 'high-priority';
    case 'Medium':
      return 'medium-priority';
    case 'Low':
      return 'low-priority';
    default:
      return ''; // Handle other cases or no priority
  }
}

updateCompletionStatus(task: Task): void {
  // Send an HTTP request to update the completion status on the server.
  this.taskService.updateTaskCompletion(task.id, task.completed).subscribe(
    (response) => {
      console.log('Task completion status updated on the server:', response);
    },
    (error) => {
      console.error('Error updating task completion status:', error);

      // If there's an error, revert the local 'completed' property to its previous state.
      task.completed = !task.completed;
    }
  );
}


updatePriorityInTaskList(taskId: number, priority: string): void {
  const taskToUpdate = this.tasks.find((task) => task.id === taskId);
  if (taskToUpdate) {
    taskToUpdate.priority = priority;
  }
}


// Create a new method to update search results
updateSearchResults(results: any[]): void {
  this.searchResults = results;
}

// Modify your search method to update search results
// searchTasks(searchTerm: string) {
//   this.taskService.searchTasksByTerm(searchTerm).subscribe((filteredTasks) => {
//     console.log('Filtered Tasks:', filteredTasks); // Add this line
//     this.updateSearchResults(filteredTasks);
//   },
//   (error) => {
//     console.error('Search Error:', error); // Log any errors
//   }
//   );
// }


searchTasks(searchTerm: string) {
  this.taskService.searchTasksByTerm(searchTerm).subscribe(
    (filteredTasks) => {
      console.log('Filtered Tasks:', filteredTasks);
      //this.searchResults = filteredTasks; // Populate searchResults
      this.updateSearchResults(filteredTasks);
      console.log('Search Results:', this.searchResults);
    },
    (error) => {
      console.error('Search Error:', error);
    }
  );
}
}
