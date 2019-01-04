import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  public dataForm: FormGroup;
  public eb;
  public is_error;
  static blankemail;
  static invalidemail;

  constructor(eb: FormBuilder, private router: Router) {
    this.eb = eb;


  }

  ngOnInit() {
    this.dataForm = this.eb.group({
      email: ["",ForgotComponent.ValidateEmail],
    });
  }

  static ValidateEmail(control: FormControl) {
    ForgotComponent.blankemail = false;
    ForgotComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
      ForgotComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      ForgotComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }
  getemail(type: any) {
    // console.log('t '+type);
    if (type == 'invalid') {
      return ForgotComponent.invalidemail;
    }
    if (type == 'blank') {
      return ForgotComponent.blankemail;
    }
  }

  dosubmit(formval) {
    console.log(formval);
    console.log(formval.email);

    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log("this.dataForm.value");
    console.log(this.dataForm.value);
    console.log("this.dataForm.valid");
    console.log(this.dataForm.valid);
  }

  }
