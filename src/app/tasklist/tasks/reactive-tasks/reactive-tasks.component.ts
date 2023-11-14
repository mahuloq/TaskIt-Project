import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
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

  constructor(
    private taskService: TaskService,
    private dataService: DataStorageService
  ) {}
  testDate = new Date();

  year = this.testDate.getFullYear();
  month: string | number = this.testDate.getMonth() + 1;
  day: string | number = this.testDate.getDate();

  monthO = this.month.toString().length > 1 ? this.month : '0' + this.month;

  dayO = this.day.toString().length > 1 ? this.day : '0' + this.day;

  newDate = `${this.year}-${this.monthO}-${this.dayO}`;

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl('Enter Title Here', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      dueDate: new FormControl(this.newDate, [Validators.required]),
      priority: new FormControl('Low', Validators.required),
      status: new FormControl('To Do', Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        this.noWhitespaceValidator,
      ]),
    });

    this.taskService.indexStateChange.subscribe();
  }
  onSubmit() {
    // var newDate = new Date();

    const newTask = { ...this.taskForm.value };

    if (this.taskEdit) {
      this.taskService.taskStateEdit(newTask, this.taskIndex);
      this.taskIndex = '';
      this.taskEdit = false;
    } else {
      this.taskService.saveTask(newTask);
    }

    this.taskForm.reset({
      title: 'Enter Title Here',
      priority: 'High',
      status: 'To Do',
      dueDate: this.newDate,
    });

    this.dataService.saveTasks();
  }

  onEdit(task: Task, index: number, view) {
    this.view = view;
    this.taskService.taskStateOpen();
    this.taskEdit = true;
    this.taskIndex = index;
    this.taskForm.patchValue({
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      description: task.description,
    });
    this.dataService.saveTasks();
  }
  onClose() {
    this.taskService.taskStateClose();
    this.taskForm.reset({
      title: 'Enter Title Here',
      priority: 'High',
      status: 'To Do',
      dueDate: this.newDate,
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
