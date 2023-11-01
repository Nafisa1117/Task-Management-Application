import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
 id:number=0;

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private taskService: TaskService
) {
  this.id = +this.route.snapshot.paramMap.get('id')!;
}

deleteTask() {
  this.taskService.deleteTask(this.id).subscribe(() => {
    // Task deleted, navigate to the task list or another appropriate page
    this.router.navigate(['/tasks']);
  });
}
}
