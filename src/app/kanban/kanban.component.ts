import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TaskService } from 'src/app/shared/taskService.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  taskState = 'closed';

  tasks = <Task[]>[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.taskService.taskListChanged.subscribe((task) => (this.tasks = task));
    this.taskService.taskStateChange.subscribe(
      (taskStatus) => (this.taskState = taskStatus)
    );
  }

  viewTask() {
    console.log('View Test');
  }

  openEdit(form, i, view: boolean) {
    form.onEdit(this.tasks[i], i, view);
    // this.taskService.taskStateEdit(i);
  }

  deleteTask(i) {
    if (!confirm('Are you sure you want to delete this?')) {
      return;
    } else {
      console.log('Delete Test');
      this.taskService.removeTask(i);
    }
  }
  openTasks() {
    this.taskService.taskStateOpen();
  }
}
