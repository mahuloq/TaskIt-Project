import {
  Component,
  ViewChild,
  Output,
  ElementRef,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TaskService } from 'src/app/shared/taskService.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css'],
})
export class TasksEditComponent implements OnInit {
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('dueDateInput') dueDateInputRef: ElementRef;
  @ViewChild('priorityInput') priorityInputRef: ElementRef;
  @ViewChild('statusInput') statusInputRef: ElementRef;
  @ViewChild('descriptionInput')
  descriptionInputRef: ElementRef;

  @Output() taskAdded = new EventEmitter<{
    title: string;
    dueDate: string;
    priority: string;
    status: string;
    description: string;
  }>();

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  onAddItem() {
    const tskTitle = this.titleInputRef.nativeElement.value;
    const tskdueDate = this.dueDateInputRef.nativeElement.value;
    const tskPriority = this.priorityInputRef.nativeElement.value;
    const tskStatus = this.statusInputRef.nativeElement.value;
    const tskDescript = this.descriptionInputRef.nativeElement.value;
    const newTask = new Task(
      tskTitle,
      tskdueDate,
      tskPriority,
      tskStatus,
      tskDescript
    );

    this.taskService.saveTask(newTask);
    document.forms['taskForm'].reset();
  }
}
