import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/taskService.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  alert = '';
  alertMessage = '';
  tasks = <Task[]>[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    let taskCheck = this.tasks;

    this.taskService.taskListChanged.subscribe((task) => (this.tasks = task));

    this.taskService.notifStateChange.subscribe((notif) => {
      this.alert = notif;
      let task = this.tasks;

      if (this.alert === 'deleted') {
        this.alertMessage = 'You have deleted a task';
        setTimeout(() => {
          this.alert = '';
        }, 2000);
      } else if (
        this.alert === 'edited' &&
        JSON.stringify(taskCheck) !== JSON.stringify(task)
      ) {
        this.alertMessage = 'You have edited a task.';
        setTimeout(() => {
          taskCheck = this.tasks;
          this.alert = '';
        }, 2000);
      } else if (
        this.alert === 'edited' &&
        JSON.stringify(taskCheck) == JSON.stringify(task)
      ) {
        this.alert = '';
        // this.alertMessage = 'No Information Changed';
        setTimeout(() => {}, 2000);
      } else {
        this.alertMessage = 'You have created a new task.';
        setTimeout(() => {
          taskCheck = this.tasks;
          this.alert = '';
        }, 2000);
      }
    });
  }
}
