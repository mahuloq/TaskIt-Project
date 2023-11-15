import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { TaskService } from './taskService.service';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private taskService: TaskService) {}

  saveTasks() {
    const tasks = this.taskService.getTasks();
    this.http
      .put(
        'https://task-it-2f090-default-rtdb.firebaseio.com/tasks.json',
        tasks
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getTasks() {
    return this.http
      .get<Task[]>(
        'https://task-it-2f090-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        map((tasks) => {
          return tasks.map((task) => {
            return {
              ...task,
            };
          });
        }),
        tap((tasks) => {
          this.taskService.setTasks(tasks);
        })
      )
      .subscribe();
  }

  // saveProfile() {
  //   const tasks = this.taskService.getTasks();
  //   this.http
  //     .put(
  //       'https://task-it-2f090-default-rtdb.firebaseio.com/profile.json',
  //       tasks
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  // getProfile() {
  //   return this.http
  //     .get<Task[]>(
  //       'https://task-it-2f090-default-rtdb.firebaseio.com/profile.json'
  //     )
  //     .pipe(
  //       map((tasks) => {
  //         return tasks.map((task) => {
  //           return {
  //             ...task,
  //           };
  //         });
  //       }),
  //       tap((tasks) => {
  //         this.taskService.setTasks(tasks);
  //       })
  //     )
  //     .subscribe();
  // }
}
