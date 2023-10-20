import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TaskService } from 'src/app/shared/taskService.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  // @Input() state: string;
  taskState = '';

  task: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.task = this.taskService.getTasks();
    this.taskService.taskListChanged.subscribe((task) => (this.task = task));
    this.taskService.taskStateChange.subscribe(
      (taskStatus) => (this.taskState = taskStatus)
    );
  }

  viewTask() {
    console.log('View Test');
  }

  openEdit(i) {
    console.log('Edit Test');
    this.taskService.taskStateEdit(i);
  }

  deleteTask(i) {
    console.log('Delete Test');
    this.taskService.removeTask(i);
  }
}
