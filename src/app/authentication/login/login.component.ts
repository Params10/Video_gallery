import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Login, loginDTO } from 'src/app/models/login.model';
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
login_DTO :loginDTO;




  constructor( private router: Router,
    private Loginservice: LoginService,
    private authUtils: AuthUtils,
    private messageService: MessageService) { 

    
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
    this.login_DTO = new loginDTO();
    this.isRequested = true;
    if (this.loginForm.valid) {
      console.log("entered in onloggedin");
      this.login_DTO = this.loginForm.value;
        this.Loginservice.login(this.login_DTO).subscribe(resp => {
          console.log("service called ");
          this.loginMaster= resp.body;
          this.isRequested = false;
          this.loadMarketPlaceUser(this.loginMaster);
          
          console.log("this is is success status"+resp.body);
        });
      
    }
  }

  loadMarketPlaceUser(received) {
      console.log("entered");
    if (received  && received.is_success === true) {
      localStorage.setItem('is_success', 'true');
      console.log(received.is_success);
      this.authUtils.setCurrentUserdata(received.data.token);
      console.log( this.authUtils.getToken());
      this.isRequested = false;
      this.router.navigate(['/movies']);
      
    } else if (received.is_success === false) {
      console.log("entered");
      this.messageService.errorsMessage(received.error);
      this.messageService.errorMessage(received.error.message); 
      this.isRequested = false; 

      
    }
    
    
  }
  
  
}
  









