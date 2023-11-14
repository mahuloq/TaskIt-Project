import { EventEmitter, Injectable, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  profileStateChange = new Subject<any>();

  profile: Profile[] = [];

  getProfile() {
    return [...this.profile];
  }

  setProfile(profile: Profile[]) {
    this.profile = profile;
    this.profileStateChange.next(this.profile);
  }
}
