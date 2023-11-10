import { Component, OnInit } from '@angular/core';
import { TaskService } from './shared/taskService.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TaskIt-Project';
  taskState;

  constructor(
    private taskService: TaskService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.taskService.taskStateChange.subscribe(
      (taskStatus) => (this.taskState = taskStatus)
    );
    this.dataService.getTasks();
  }
}
