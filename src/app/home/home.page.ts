import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginform!: FormGroup;
  isSubmitted = false;

  get errorControl(){
    return this.loginform.controls;
  }


  constructor(public formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email : ['',[ Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login(email: any , password: any){
    this.isSubmitted= true;
    console.log(this.loginform.value);
  }

}
