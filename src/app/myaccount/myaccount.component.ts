import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
  providers: [Commonservices],
})
export class MyaccountComponent implements OnInit {
  public dataForm: FormGroup;
  public kl;
  public serverurl;
  public id;
  public userid;

  constructor(kl: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private route: ActivatedRoute,private cookeiservice: CookieService)  {
    this.kl = kl;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
  /*  this.route.params.subscribe(params => {
      this.id = params['id'];                                                    //pass the parameter by id
      console.log('this.id');*/
      this.userid = this.cookeiservice.get('userid');
      console.log(this.userid);
      this.getdetails();

  //  })

    this.dataForm = this.kl.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required])],
      address: ['', Validators.required],
      telephoneno: ['', Validators.required],
      mobileno: ['', Validators.required]
    });
  }
  getdetails() {
    let link = this.serverurl + 'details';                      //calling 'details' function, declare it on node.server
    let data = {_id : this.userid};
    this._http.post(link, data)
        .subscribe(res => {
          let result: any;
          result = res;
          console.log(result);
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            // console.log(result);
            let userdet = result.item;
            this.dataForm = this.kl.group({
              fname: [userdet.firstname, Validators.required],
              lname: [userdet.lastname, Validators.required],
              email: [userdet.email, Validators.compose([Validators.required])],
              address: [userdet.address, Validators.required],
              telephoneno: [userdet.telephoneno, Validators.required],
              mobileno: [userdet.mobileno, Validators.required]
            });

          }else {
            this.router.navigate(['/dashboard']);
          }

        }, error => {
          console.log('Ooops');
        });
  }
  dosubmit(formval) {
    if (this.dataForm.valid) {
      let link= this.serverurl + 'editadmin';
      let data = {id: this.userid,
        firstname: formval.fname,
        lastname: formval.lname,
        email: formval.email,
        address: formval.address,
        telephoneno: formval.telephoneno,
        mobileno: formval.mobileno,
      };
      console.log(this.dataForm.valid);
      console.log(data);
      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/manageadmin']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
