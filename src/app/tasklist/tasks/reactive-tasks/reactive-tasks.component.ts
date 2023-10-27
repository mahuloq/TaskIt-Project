import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  taskEdit = false;
  taskIndex;
  view = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      dueDate: new FormControl(null, [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      priority: new FormControl(null),
      status: new FormControl(null),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        this.noWhitespaceValidator,
      ]),
    });

    this.taskService.indexStateChange
      .subscribe
      // (storedIndex) =>();
      ();
  }
  onSubmit() {
    this.onFormSubmit = true;

    const newTask = { ...this.taskForm.value };

    // const newTask = new Task(
    //   this.taskForm.value['title'],
    //   this.taskForm.value['dueDate'],
    //   this.taskForm.value['priority'],
    //   this.taskForm.value['status'],
    //   this.taskForm.value['description']
    // );

    // const tskTitle = this.taskForm.value.title;
    // const tskdueDate = this.taskForm.value.dueDate;
    // const tskPriority = this.taskForm.value.priority;
    // const tskStatus = this.taskForm.value.status;
    // const tskDescript = this.taskForm.value.description;
    // const newTask = new Task(
    //   tskTitle,
    //   tskdueDate,
    //   tskPriority,
    //   tskStatus,
    //   tskDescript
    // );

    if (this.taskEdit) {
      this.taskService.taskStateEdit(newTask, this.taskIndex);
      this.taskIndex = '';
      this.taskEdit = false;
    } else {
      this.taskService.saveTask(newTask);
    }
    this.taskForm.reset();
  }

  onEdit(task: Task, index: number, view) {
    this.view = view;
    this.taskService.taskStateOpen();
    this.taskEdit = true;
    console.log(index);
    console.log(task);
    this.taskIndex = index;
    this.taskForm.patchValue({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      description: task.description,
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
