import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../model/appointment';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  appointments! : Appointment[];

  constructor(public formBuilder: FormBuilder,
    public appointmentService: AppointmentService,
    ) { }
    ngOnInit() {
      this.appointmentService.getBookings().subscribe((res) => {
        this.appointments = res.map((t) => {
          return{
            id: t.payload.doc.id,
            ...t.payload.doc.data() as Appointment
          }
        })
      })
    }
    AppointmentList(){
      this.appointmentService.getBookings().subscribe((data) => {
        console.log(data);
      })
    }
    remove(id: any){
  console.log(id);
  if(window.confirm('Are you sure ? ')){
    this.appointmentService.deleteBooking(id)
  }
    }

  }
