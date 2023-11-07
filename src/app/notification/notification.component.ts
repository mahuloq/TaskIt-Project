import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/taskService.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  alert = '';
  alertMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.notifStateChange.subscribe((notif) => {
      this.alert = notif;

      if (this.alert === 'deleted') {
        this.alertMessage = 'You have deleted a task';
        setInterval((alert) => {
          this.alert = '';
        }, 5000);
      } else if (this.alert === 'edited') {
        this.alertMessage = 'You have edited a task.';
        setInterval((alert) => {
          this.alert = '';
        }, 5000);
      } else {
        this.alertMessage = 'You have created a new task.';
        setInterval((alert) => {
          this.alert = '';
        }, 5000);
      }
    });
  }
}
