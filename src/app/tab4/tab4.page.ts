import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public admin = false;

  constructor(
    public authService: AngularFireAuth,
    public firestore: AngularFirestore,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.authService.onAuthStateChanged(user => {
      if(user){
       this.firestore.doc(`/users/${user.uid}`)
       .get()

      }
    })
  }

}
