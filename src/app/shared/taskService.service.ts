import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  taskSelected = new EventEmitter<Task>();
  taskListChanged = new EventEmitter<Task[]>();
  taskStateChange = new EventEmitter<string>();
  taskState = '';

  allTasks: Task[] = [
    new Task('Mow Lawn', 'new Date()', 'High', 'Open'),
    new Task('Clean Room', 'new Date()', 'Medium', 'Open'),
    new Task('Become Genius Coder', 'new Date()', 'Low', 'Closed'),
  ];

  getTasks() {
    return [...this.allTasks];
  }

  selectTask(task: Task) {
    this.taskSelected.emit(task);
  }

  removeBook(id: number) {
    this.allTasks.splice(id, 1);
    this.taskListChanged.emit(this.getTasks());
  }

  saveTask(task: Task) {
    this.allTasks.push(task);
    this.taskListChanged.emit(this.getTasks());
    this.taskState = 'closed';
    this.taskStateChange.emit(this.taskState);
  }
  taskStateOpen() {
    this.taskState = 'open';
    this.taskStateChange.emit(this.taskState);
  }
}
