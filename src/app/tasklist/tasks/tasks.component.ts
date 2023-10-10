import { Component, Input } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Input() test: string;

  task: Task[] = [
    new Task('Mow Lawn', 'new Date()', 'High', 'Open'),
    new Task('Clean Room', 'new Date()', 'Medium', 'Open'),
    new Task('Become Genius Coder', 'new Date()', 'Low', 'Closed'),
  ];

  onTaskAdded(tasks: Task) {
    this.task.push(tasks);
  }
}
