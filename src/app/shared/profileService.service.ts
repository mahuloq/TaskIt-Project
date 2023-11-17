import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { Profile } from './profile.model';
import { ProfileData } from './profileData.model';

@Injectable({ providedIn: 'root' })
export class ProfileService implements OnInit {
  profileStateChange = new BehaviorSubject<Profile>(null);
  profile: Profile = new Profile('', '');
  currentProfile: ProfileData = new ProfileData('', '');

  constructor() {}

  ngOnInit(): void {}

  public handleProfile(profile: Profile) {
    this.profile = profile;
    console.log(this.profile);
    this.profileStateChange.next(profile);
    console.log('handleProfile Test');
  }

  getProfile() {
    return this.profile;
  }

  setProfile(profile) {}
}
