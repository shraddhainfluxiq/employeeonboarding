import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

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
      email: ["",ChangepassComponent.ValidateEmail]

    });
  }

  static ValidateEmail(control: FormControl) {
    ChangepassComponent.blankemail = false;
    ChangepassComponent.invalidemail = false;

    if (control.value == '' || control.value == null) {
      ChangepassComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      ChangepassComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }
  getemail(type: any) {
    // console.log('t '+type);
    if (type == 'invalid') {
      return ChangepassComponent.invalidemail;
    }
    if (type == 'blank') {
      return ChangepassComponent.blankemail;
    }
  }
  dosubmit(val){
  }
}
