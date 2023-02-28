import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loginform!: FormGroup;
  isSubmitted = false;

  get errorControl(){
    return this.loginform.controls;
  }

  constructor(public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email : ['',[ Validators.required, Validators.email]],
      name : ['', Validators.required],
      lastname : ['', Validators.required],
      date: ['', Validators.required],
      address : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles',
    });

    loading.present();
  }

  register(){
    this.isSubmitted = true;
    console.log(this.loginform.value);
  }

}
