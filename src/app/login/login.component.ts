import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public dataForm: FormGroup;
  public eb;
  public is_error;
  static blankemail;
  static invalidemail;
  static blankpassword;
  static invalidpassword;

  constructor(eb: FormBuilder, private router: Router) {
    this.eb = eb;


  }

  ngOnInit() {
    this.dataForm = this.eb.group({
      email: ["",LoginComponent.ValidateEmail],
      password: ["",LoginComponent.ValidatePassword],
    });
  }

  static ValidateEmail(control: FormControl) {
    LoginComponent.blankemail = false;
    LoginComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
      LoginComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      LoginComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }
  getemail(type: any) {
    // console.log('t '+type);
    if (type == 'invalid') {
      return LoginComponent.invalidemail;
    }
    if (type == 'blank') {
      return LoginComponent.blankemail;
    }
  }
  static ValidatePassword(control:FormControl){
    LoginComponent.blankpassword=false;
    LoginComponent.invalidpassword=false;

      if(control.value=='' || control.value==null)
      {
        LoginComponent.blankpassword=true;
        return{'invalidpassword':true};
      }
   if (!control.value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")){
     LoginComponent.invalidpassword=true;
     return{'invalidpassword':true};

      }
  }

  getpassword (type:any){
    if(type=='invalid'){

      return LoginComponent.invalidpassword;
    }

    if(type=='blank'){

      return LoginComponent.blankpassword;
    }

  }




  dosubmit(formval) {
    console.log(formval);
    console.log(formval.email);
    console.log(formval.password);

    let x:any;
    for(x in this.dataForm.controls){
      this.dataForm.controls[x].markAsTouched();
    }
    console.log("this.dataForm.value");
    console.log(this.dataForm.value);
    console.log("this.dataForm.valid");
    console.log(this.dataForm.valid);




  }
}


