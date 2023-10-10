import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent {
  @Output() taskState = 'closed';

  openTasks() {
    if (this.taskState === 'closed') {
      this.taskState = 'open';
    } else {
      this.taskState = 'closed';
    }
    console.log(this.taskState);
  }
}
