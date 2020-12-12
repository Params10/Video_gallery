import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {AuthUtils} from 'src/app/utils/authutils';
import {MessageService} from 'src/app/services/message.service'
import {StaticVariables} from 'src/app/utils/staticvariables'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
showErrorMsg: boolean;
showSuccessMsg: boolean;
errorMessage: string;
successMessage: string;
loginForm: FormGroup;
loginMaster: Login;
submitted = false;
isRequested = true;




  constructor( private router: Router,
    private Loginservice: LoginService,
    private authUtils: AuthUtils,
    private messageService: MessageService) { 

    this.loginMaster = new Login();
    this.showErrorMsg = false;
    this.isRequested = false;
      console.log(this.isRequested);
    this.loginForm = new FormGroup({
  
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
        
    });
  }

  ngOnInit(): void { }
  get f() { return this.loginForm.controls; }

  onLoggedin() {
    this.isRequested = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
        this.Loginservice.login(this.loginForm.value).subscribe(resp => {
          this.loadMarketPlaceUser(resp);
          this.isRequested = false;
        });
      
    }
  }

  loadMarketPlaceUser(resp) {
      console.log("entered");
    if (resp && resp.body && resp.body.is_success === true) {
      localStorage.setItem('is_success', 'true');
      console.log(resp.body.data.token);
      this.authUtils.setCurrentUserdata(resp.body.data.token);
      console.log( this.authUtils.getToken());
      this.isRequested = false;
      this.router.navigate(['/movies']);
      
    } else if (resp.body.is_success === false) {
      this.messageService.errorsMessage(resp.body.error);
      this.messageService.errorMessage(resp.body.error.message); 
      this.isRequested = false; 
      
    }
    
  }
  
  
}
  









