import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private dateService: DataStorageService) {}
  userImage =
    'https://ih1.redbubble.net/image.1362253646.0602/st,small,845x845-pad,1000x1000,f8f8f8.jpg';

  userName = 'Matt';
  userEmail = 'Matt@codingscool.com';

  onSaveDate() {
    this.dateService.saveTasks();
  }

  onFetchData() {
    this.dateService.getTasks();
  }
}
