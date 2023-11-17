import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../shared/profileService.service';
import { Profile } from '../shared/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile = new Profile('', '');
  subscription: Subscription;
  userName;
  userImg;
  userEmail;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    // this.subscription = this.authService.AuthDataChanged.subscribe(
    //   (profile) => {
    //     console.log('ng On init test');
    //     console.log(profile);
    //     this.profileService.handleProfile(profile);
    //   }
    // );
    this.subscription = this.profileService.profileStateChange.subscribe(
      (profile) => {
        this.profile = profile;
        console.log(this.profile);
        console.log('profile component test 1');
        this.userEmail = this.profile.email;
        // this.userName = this.profile.userName;
        // this.userImage = this.profile.userImage;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
