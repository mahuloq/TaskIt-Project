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
  // objectDate: any = Date();
  // day = this.objectDate.getDate();
  // month = this.objectDate.getMonth();
  // year = this.objectDate.getYear();

  // format1 = `${this.month}/${this.day}/${this.year}`;

  allTasks: Task[] = [
    new Task('Mow Lawn', Date(), 'High', false, 'test'),
    new Task('Clean Room', Date(), 'Medium', false, 'test 2'),
    new Task('Become Genius', Date(), 'Low', false, 'test 3'),
  ];

  getTasks() {
    return [...this.allTasks];
  }

  getTask(index: number) {
    // return this.allTasks(index).slice()
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
    this.taskState = 'closed';
    this.taskStateChange.emit(this.taskState);
    this.taskListChanged.emit(this.getTasks());
  }
  taskStateOpen() {
    this.taskState = 'open';
    this.taskStateChange.emit(this.taskState);
  }

  taskStateClose() {
    this.taskState = 'closed';
    this.taskStateChange.emit(this.taskState);
  }

  taskStateEdit(task, index) {
    this.allTasks[index] = task;
    this.taskState = 'closed';
    this.taskStateChange.emit(this.taskState);
    this.taskListChanged.emit(this.getTasks());
  }
}
