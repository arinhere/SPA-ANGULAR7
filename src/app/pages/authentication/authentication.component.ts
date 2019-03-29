import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TestService } from '../../core/services/test.services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit {

  signUpForm: FormGroup;
  loginForm: FormGroup;

  constructor(private _testService:TestService, private fb: FormBuilder, private _snack: MatSnackBar){
  }

  ngOnInit(){
    console.log("Is it really working, I can't believe");
    this.signUpForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })

    this.loginForm=this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  onSubmit(formVal){
    this._testService.signUp(formVal.value)
      .subscribe(res=>{
        this.signUpForm.reset();
        this._snack.open("User Created. Login to continnue.",'Success',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });
      },
      err=>{
        this._snack.open("Error creating user",'Error',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });
      })
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onLogin(formVal){
    this._testService.login(formVal.value)
      .subscribe(res=>{
        this.loginForm.reset();
        localStorage.setItem("token",res['token']);
        alert("Token Created by server: " + res["token"]);
      },
      err=>{
        this._snack.open("Invalid login details.",'Error',{
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom"
        });
      })
  }

  //convenience getter for easy access to form fields
  get loginControl() { return this.loginForm.controls; }

  getData(){
    this._testService.getData()
      .subscribe(res=>{
        console.log(res)
      })
  }

  postData(){
    var body={
      name: 'Arya',
      email: 'aryaditya@gmail.com'
    };

    // this._testService.postData(body)
    //   .subscribe(res=>{
    //     console.log(res)
    //   })
  }
  
  delData(){
    this._testService.deleteData('Arin')
      .subscribe(res=>{
        console.log(res);
      })
  }


}
