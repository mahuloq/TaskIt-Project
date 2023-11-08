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
    let testDate = new Date();

    let year = testDate.getFullYear();
    let month: string | number = testDate.getMonth();
    let day: string | number = testDate.getDate();

    month = month.toString().length > 1 ? month : '0' + month;
    day = day.toString().length > 1 ? day : '0' + day;

    let newDate = `${year}-${month}-${day}`;

    this.taskForm = new FormGroup({
      title: new FormControl('Enter Title Here', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      dueDate: new FormControl(newDate, [Validators.required]),
      priority: new FormControl('Low', Validators.required),
      status: new FormControl('To Do', Validators.required),
      description: new FormControl('test', [
        Validators.required,
        Validators.minLength(3),
        this.noWhitespaceValidator,
      ]),
    });

    this.taskService.indexStateChange.subscribe();
  }
  onSubmit() {
    var newDate = new Date();

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
    });
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
  }
  onClose() {
    this.taskService.taskStateClose();
    this.taskForm.reset({
      title: 'Enter Title Here',
      priority: 'High',
      status: 'To Do',
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
