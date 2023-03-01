import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  apform!: FormGroup;
  isSubmitted = false;
  id: any;

  get errorControl(){
    return this.apform.controls;
  }

  constructor(public formBuilder: FormBuilder,
    public appointmentService: AppointmentService,
    private actRoute: ActivatedRoute,
    public router: Router,) {
      this.id = this.actRoute.snapshot.paramMap.get('id');
      this.appointmentService.getBooking(this.id).subscribe((data: any) => {
        this.apform = this.formBuilder.group({
          name: [data ['name']],
          surname: [data ['surname']],
          email: [data['email']],
          phone: [data['phone']],
          date: [data['date']],
        })
      });
    }

  ngOnInit() {
    this.apform = this.formBuilder.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      date : ['', Validators.required],
      email : ['',[ Validators.required, Validators.email]],
      phone : ['', [Validators.required, Validators.minLength(8)]]
    })
    // this.apform = this.formBuilder.group({
    //   name: [''],
    //   email: [''],
    //   mobile: ['']
    // })
    // console.log(this.updateBookingForm.value)
  }
  updateForm() {
    // this.appointmentService.updateBooking(this.id, this.apform.value)
    //   .then((res) => {
    //     this.router.navigate(['/appointment-list']);
    //   })
    //   .catch((error: any) => console.log(error));
    this.appointmentService.updateBooking(this.id, this.apform.value);
  }

}
