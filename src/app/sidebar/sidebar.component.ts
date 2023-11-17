import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../shared/profileService.service';
import { Profile } from '../shared/profile.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;

  profile = new Profile('', '');
  subscription: Subscription;

  userImage =
    'https://ih1.redbubble.net/image.1362253646.0602/st,small,845x845-pad,1000x1000,f8f8f8.jpg';

  userName = 'Matt';
  userEmail = 'matt@mattiscool.com';

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.subscription = this.authService.AuthDataChanged.subscribe(
      (profile) => {
        console.log('ng On init test');
        console.log(profile);
        this.profileService.handleProfile(profile);
      }
    );

    this.profileService.profileStateChange.subscribe((profile) => {
      this.profile = profile;
      console.log(this.profile);
      console.log('sidebar component test 2');
      this.userEmail = this.profile.email;
      // this.userName = this.profile.userName;
      // this.userImage = this.profile.userImage;
    });
  }
  logout() {
    this.authService.logout();
  }
}
