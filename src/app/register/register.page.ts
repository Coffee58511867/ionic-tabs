import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

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
    public userServices: ProfileService,
    public router : Router,
    ) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email : ['',[ Validators.required,   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name : ['', Validators.required],
      lastname : ['', Validators.required],
      date: ['', Validators.required],
      address : ['', Validators.required],
      // Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),  password pattern
      password : ['', [Validators.required, Validators.minLength(8)]]
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
    if(this.loginform.valid){
      this.userServices.saveProfile(this.loginform.value).then((res: any) => {
        console.log(res)
        this.loginform.reset();
        this.router.navigate(['/home']);
      })
        .catch((error: any) => console.log(error));
    }
  }

}
