import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from '../shared/profileService.service';
import { Profile } from '../shared/profile.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileData } from '../shared/profileData.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  profile = new ProfileData('', '');
  subscription: Subscription;

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
        setTimeout(() => {
          this.profile = this.profileService.getProfile();
        }, 2000);

        console.log('profile component test 1');

        // this.userName = this.profile.userName;
        // this.userImage = this.profile.userImage;
      }
    );
    this.profileForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      userImage: new FormControl(null),
    });
  }

  onSubmit() {
    const profileChange = { ...this.profileForm.value };
    if (profileChange.userImage !== null) {
      this.profileService.saveProfile(profileChange);
    } else if (profileChange.userImage == null) {
      this.profileService.saveProfile(this.profileForm.value.userName);
    } else {
      this.profileService.saveProfile(profileChange);
    }
    this.profileForm.reset();
  }

  onReset() {
    this.profileForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
