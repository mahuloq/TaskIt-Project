import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/shared/task.model';
import { TaskService } from 'src/app/shared/taskService.service';

@Component({
  selector: 'app-reactive-tasks',
  templateUrl: './reactive-tasks.component.html',
  styleUrls: ['./reactive-tasks.component.css'],
})
export class ReactiveTasksComponent implements OnInit {
  taskForm: FormGroup;
  onFormSubmit = false;
  taskIndex;
  // allTasks: Task[] = [
  //   new Task('Mow Lawn', '11/17/23', 'High', 'Open', 'test'),
  //   new Task('Clean Room', '11/17/23', 'Medium', 'Open', 'test 2'),
  //   new Task('Become Genius', '11/17/23', 'Low', 'Closed', 'test 3'),
  // ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null),
      dueDate: new FormControl(null),
      priority: new FormControl(null),
      status: new FormControl(null),
      description: new FormControl(null),
    });

    this.taskService.indexStateChange.subscribe(
      (storedIndex) => this.taskIndex
    );
  }
  onSubmit() {
    this.onFormSubmit = true;

    const tskTitle = this.taskForm.value.title;
    const tskdueDate = this.taskForm.value.dueDate;
    const tskPriority = this.taskForm.value.priority;
    const tskStatus = this.taskForm.value.status;
    const tskDescript = this.taskForm.value.description;
    const newTask = new Task(
      tskTitle,
      tskdueDate,
      tskPriority,
      tskStatus,
      tskDescript
    );

    this.taskService.saveTask(newTask);
    this.taskForm.reset();
  }
}
