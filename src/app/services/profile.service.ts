import { Injectable } from '@angular/core';
import { UserProfile } from '../model/UserProfile';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private ngFirestore: AngularFirestore,
    private router : Router,) { }

    saveProfile(addProfile: UserProfile){
      return this.ngFirestore.collection('UsersProfile').add(addProfile);
    }
}
