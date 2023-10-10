import {
  Component,
  ViewChild,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css'],
})
export class TasksEditComponent {
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('dueDateInput') dueDateInputRef: ElementRef;
  @ViewChild('priorityInput') priorityInputRef: ElementRef;
  @ViewChild('statusInput') statusInputRef: ElementRef;
  @Output() taskAdded = new EventEmitter<{
    title: string;
    dueDate: string;
    priority: string;
    status: string;
  }>();

  onAddItem() {
    const tskTitle = this.titleInputRef.nativeElement.value;
    const tskdueDate = this.dueDateInputRef.nativeElement.value;
    const tskPriority = this.priorityInputRef.nativeElement.value;
    const tskStatus = this.statusInputRef.nativeElement.value;
    const newTask = new Task(tskTitle, tskdueDate, tskPriority, tskStatus);

    this.taskAdded.emit(newTask);
    document.forms['taskForm'].reset();
  }
}
