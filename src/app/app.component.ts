import { Component, OnInit } from '@angular/core';
import { TaskService } from './shared/taskService.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';

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
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taskService.taskStateChange.subscribe(
      (taskStatus) => (this.taskState = taskStatus)
    );
    this.dataService.getTasks();

    this.authService.autoLogin();
  }
}
