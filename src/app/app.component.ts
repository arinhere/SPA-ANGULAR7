import { Component } from '@angular/core';
import { TestService } from './core/services/test.services';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { BehaviorService } from './core/behave/behave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  enable=0;

  constructor(private _behavior:BehaviorService, private _router:Router){
    
  }

  ngOnInit(){
    this._behavior.updatedToken.subscribe(newToken=>{
      console.log("newToken: ",newToken);
      if(newToken==''){
        this.enable=0;
      }
      else{
        this.enable=1;
      }      
    })
  }

  logout(){
    localStorage.removeItem("token");
    this._behavior.changetoken('');
    this._router.navigate(['/']);
  }

}
