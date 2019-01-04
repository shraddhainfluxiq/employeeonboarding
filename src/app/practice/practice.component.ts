import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
  providers: [Commonservices],
})
export class PracticeComponent implements OnInit {

  public dataForm: FormGroup;
  public kp;
  public serverurl;
  public errormg='';


  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient ,private cookeiservice: CookieService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    this.dataForm = this.kp.group({
      email: ['', Validators.compose([Validators.required, PracticeComponent.customValidator])],
      password: ['', Validators.compose([Validators.required])],
    })

  }

  static customValidator(inputemail): any {
    console.log('inputemail');
    console.log(inputemail);
    if (inputemail.pristine) {
      return null;
    }
    inputemail.markAsTouched();
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    console.log(String(inputemail.value).search(filter) != -1);
    if (String(inputemail.value).search(filter) == -1) {
      console.log('valid');
      return {
        invalidemail: true

      }
    }

  }

  dosubmit(formval) {
    this.errormg='';
    console.log(formval.email);
    console.log(formval.password);

    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
      console.log(this.dataForm.controls[x].valid);
    }
    console.log("this.dataForm.value");
    console.log(this.dataForm.value);
    console.log("this.dataForm.valid");
    console.log(this.dataForm.valid);

    if (this.dataForm.valid) {
      let link = this.serverurl + 'login';
      let data = {
        email: formval.email,
        password: formval.password,

      };
      this._http.post(link, data)
          .subscribe(res => {
            let result:any ={};
            result = res;
            console.log('result....');
            console.log(result);
            if(result.status=='error'){
              this.errormg=result.msg;
            }
            if(result.status=='success') {
              console.log('login success');
              console.log('result.msg.type');
              console.log(result.msg.type);
              this.cookeiservice.set('userid', result.msg._id);
              this.cookeiservice.set('useremail', result.msg.email);
              this.cookeiservice.set('userfirstname', result.msg.firstname);
              this.cookeiservice.set('userlastname', result.msg.lastname);
              this.cookeiservice.set('usertype', result.msg.type);

              if (result.msg.type == 'admin') {
                this.router.navigate(['/dashboard']);
              }
              if (result.msg.type == 'employee') {
                this.router.navigate(['/training']);
              }
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
