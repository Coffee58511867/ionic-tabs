import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  apform!: FormGroup;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder,
    public appointmentService: AppointmentService,
    public router: Router,
    ) { }

  ngOnInit() {
    this.apform = this.formBuilder.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      date : ['', Validators.required],
      email : ['',[ Validators.required, Validators.email]],
      phone : ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  submitForm(){
    this.isSubmitted= true;
    if(this.apform.valid){
      console.log(this.apform.value)
      this.appointmentService.book(this.apform.value).then((res: any) => {
        console.log(res)
        this.apform.reset();
        this.router.navigate(['/tabs']);
      })
        .catch((error: any) => console.log(error));
    }

  }
  get errorControl(){
    return this.apform.controls;
  }

}
