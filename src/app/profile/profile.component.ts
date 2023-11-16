import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../shared/profileService.service';
import { Profile } from '../shared/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile[] = [];

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.authService.AuthDataChanged.subscribe((data) => {
      console.log('ng On init test');
      console.log(data);
      // this.profileService.handleProfile(data.email, data.userId);

      console.log('profile component test 1');
    });

    this.profileService.profileStateChange.subscribe((data) => {
      this.profile = [data.email, data.userId];
      console.log(this.profile);
      console.log('profile component test 2');
    });
  }
}
