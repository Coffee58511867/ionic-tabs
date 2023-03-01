import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private ngFirestore: AngularFirestore,
     private router : Router,
     private afAuth: AngularFireAuth,
     ) { }

  book(appointment: Appointment){
    return this.ngFirestore.collection('Bookings').add(appointment);
  }
  getBookings(){
    return this.ngFirestore.collection('Bookings').snapshotChanges();
  }
  // getUserBooking(user = this.afAuth.currentUser){
  //   //let user = this.afAuth.currentUser;
  //   return this.ngFirestore.collection('Bookings').doc(user).snapshotChanges();
  // }
  getBooking(id: any){
    return this.ngFirestore.collection('Bookings').doc(id).valueChanges()
  }
  updateBooking(id: string, appointment: Appointment){
    this.ngFirestore.collection('Bookings').doc(id).update(appointment)
    .then(() => {
      this.router.navigate(['/appointment-list']);

    }).catch(error => console.log(error));
  }
  deleteBooking(id : string){
    this.ngFirestore.doc('Bookings/' +id).delete();
  }
}
