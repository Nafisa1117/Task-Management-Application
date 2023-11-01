
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit{

  
  id:number=0;
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    completed:false,
    category: '',
    priority:''
  }

  constructor(private taskService: TaskService,private route: ActivatedRoute, private router: Router, private datePipe: DatePipe){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id = this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.id).subscribe(data => {
      this.task = data;

         // Format the dueDate using DatePipe
         this.task.dueDate = this.datePipe.transform(this.task.dueDate, 'yyyy-MM-dd');
    }, error => console.log(error));
  }

  onSubmit(): void {
    if (this.task.id) {
      // If the task has an ID, it's an update
      this.taskService.updateTask(this.task.id, this.task).subscribe(
        (response) => {
          console.log('Task updated:', response);
          // Optionally, reset the form or handle success
          // this.task = new Task();


        // Call the method to update the priority in the task list
        this.updatePriorityInTaskList(this.task.id, this.task.priority);

          // Redirect to the task list page
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error updating task:', error);
          // Optionally, handle the error
        }
      );
    } else {
      // If the task has no ID, it's a create
      this.taskService.createTask(this.task).subscribe(
        (response) => {
          console.log('Task created:', response);
          // Optionally, reset the form or handle success
          // this.task = new Task();

          // Redirect to the task list page
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error creating task:', error);
          // Optionally, handle the error
        }
      );
    }
  }


  // In your component, handle form submission to update the task
updateTaskCompletion(task: Task): void {
  this.taskService.updateTask(this.id,this.task).subscribe(
    (response) => {
      console.log('Task updated:', response);
    },
    (error) => {
      console.error('Error updating task:', error);
    }
  );
}


updatePriorityInTaskList(taskId: number, priority: string): void {
  // Assuming you have a service to get the tasks list, you can update the priority there
  this.taskService.updateTaskPriority(taskId, priority);
}

}
