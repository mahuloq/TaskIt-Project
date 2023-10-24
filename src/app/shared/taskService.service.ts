import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  taskSelected = new EventEmitter<Task>();
  taskListChanged = new EventEmitter<Task[]>();
  taskStateChange = new EventEmitter<string>();
  indexStateChange = new EventEmitter<number>();

  taskState = '';
  storedIndex;

  allTasks: Task[] = [
    new Task('Mow Lawn', '11/17/23', 'High', 'Open', 'test'),
    new Task('Clean Room', '11/17/23', 'Medium', 'Open', 'test 2'),
    new Task('Become Genius', '11/17/23', 'Low', 'Closed', 'test 3'),
  ];

  getTasks() {
    return [...this.allTasks];
  }

  selectTask(task: Task) {
    this.taskSelected.emit(task);
  }

  removeTask(id: number) {
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

  taskStateEdit(i) {
    this.storedIndex = i;
    this.taskState = 'open';
    this.taskStateChange.emit(this.taskState);
    this.indexStateChange.emit(this.storedIndex);
  }
}
