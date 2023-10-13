import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from '../shared/taskService.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  openTasks() {
    this.taskService.taskStateOpen();
  }
}
