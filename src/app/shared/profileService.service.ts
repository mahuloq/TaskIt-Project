import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { Profile } from './profile.model';
import { ProfileData } from './profileData.model';
import { TaskService } from './taskService.service';

@Injectable({ providedIn: 'root' })
export class ProfileService implements OnInit {
  profileStateChange = new BehaviorSubject<Profile>(null);
  profileNotifStateChange = new Subject<string>();
  profileDataChange = new BehaviorSubject<ProfileData>(null);
  profile: ProfileData = new ProfileData(
    '',
    '',
    'Matt',
    'https://ih1.redbubble.net/image.1362253646.0602/st,small,845x845-pad,1000x1000,f8f8f8.jpg'
  );

  profileDate: ProfileData;
  notifstate = '';

  constructor() {}

  ngOnInit(): void {}

  public handleProfile(profile: Profile) {
    this.profile.email = profile.email;
    this.profile.id = profile.id;
    // this.profile.id = profile.id
    console.log(this.profile);
    this.profileStateChange.next(profile);
    console.log('handleProfile Test');
  }

  returnID() {
    this.profile.id;
    console.log(this.profile.id);
  }

  getProfile() {
    return this.profile;
  }

  saveProfile(data: ProfileData) {
    console.log(data);
    this.profile.userName = data.userName;
    if (data.userImage !== null) {
      this.profile.userImage = data.userImage;
    }
    this.notifstate = 'updated';
    this.profileNotifStateChange.next(this.notifstate);
    this.profileDataChange.next(data);
  }

  setProfile(profile) {}
}
