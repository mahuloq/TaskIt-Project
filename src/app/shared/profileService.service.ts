import { Injectable, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService implements OnInit {
  profileStateChange = new Subject<any>();
  profile: Profile[] = [];

  constructor() {}

  ngOnInit(): void {}

  public handleProfile(email: any, userId: string) {
    this.setProfile([email, userId]);
    console.log('handleProfile Test');
  }

  getProfile() {
    return [...this.profile];
  }

  setProfile(profile: Profile[]) {
    console.log('Set Profile Test');
    this.profile = profile;
    this.profileStateChange.next(this.profile);
  }
}
