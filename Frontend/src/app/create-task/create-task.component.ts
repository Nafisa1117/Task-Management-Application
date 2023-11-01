import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{
//task: Task = new Task();
task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    completed: false,
    category: '',
    priority:''
  }
//task: Task = new Task(1, 'Sample Task', 'Sample Description', new Date());

  constructor(private taskService: TaskService, private router: Router){

  }

  ngOnInit(): void {

  }

  saveTask(){
    this.taskService.createTask(this.task).subscribe(data => {
      console.log(data);
      this.gotoTaskList();
    }, error => console.log(error));

  }

  gotoTaskList(){
    this.router.navigate(['/tasks']);
  }

  onSubmit(){
   console.log(this.task);
   this.saveTask();
  }


}
