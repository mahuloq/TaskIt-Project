import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { TaskService } from './taskService.service';
import { Task } from './task.model';
import { ProfileData } from './profileData.model';
import { ProfileService } from './profileService.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private taskService: TaskService,
    private profileService: ProfileService
  ) {}

  uniqueID = '3n0xXCIQqBQp1IobLbcYWCIi4ol1';

  saveTasks() {
    const tasks = this.taskService.getTasks();
    this.http
      .put(
        'https://task-it-2f090-default-rtdb.firebaseio.com/tasks.json',
        tasks
      )
      .subscribe((response) => {});
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

  saveProfile() {
    console.log('Save Profile');
    const profile = this.profileService.getProfile();
    this.http
      .put(
        `https://task-it-2f090-default-rtdb.firebaseio.com/profile/${this.uniqueID}.json`,
        profile
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getProfile() {
    return this.http
      .get<ProfileData>(
        `https://task-it-2f090-default-rtdb.firebaseio.com/profile/${this.uniqueID}.json`
      )
      .pipe(
        tap((profiles) => {
          this.profileService.setProfile(profiles);
        })
      )
      .subscribe();
  }
}
