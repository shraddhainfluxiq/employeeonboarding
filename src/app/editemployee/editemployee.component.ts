import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import {visitValue} from "@angular/compiler/src/util";

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css'],
  providers: [Commonservices]
})
export class EditemployeeComponent implements OnInit {

  public dataForm: FormGroup;
  public ks;
  public serverurl;
  public id;

  constructor(ks: FormBuilder, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute, private _http: HttpClient) {
    this.ks = ks;
    this.serverurl = _commonservices.url;
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getdetails01();
    });

      this.dataForm = this.ks.group({
          fname: [''], //EditemployeeComponent.ValidateFname],
          lname: [''], //EditemployeeComponent.ValidateLname],
          gender: [''], //Validators.required],
          address: [''], //Validators.required],
          city: [''], //Validators.required],
          state: [''], //Validators.required],
          zip: [''], //Validators.required],
          email: [''], //EditemployeeComponent.ValidateEmail],
          phoneno: [''], //Validators.required],
          date: [''], //Validators.required]
        });

  }
  getdetails01() {
    let link = this.serverurl + 'det';
    let data = {_id : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result: any;
          result = res;
          console.log(result);
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            // console.log(result);
            let userdet = result.item;
            this.dataForm = this.ks.group({
              fname: [userdet.firstname],
              lname: [userdet.lastname],
              gender:[userdet.gender],
              address: [userdet.address],
              city: [userdet.city],
              state: [userdet.state],
              zip: [userdet.zip],
              email: [userdet.email],
              phoneno: [userdet.phoneno],
              date: [userdet.date]
            });

          }else {
            this.router.navigate(['/employeelist']);
          }

        }, error => {
          console.log('Ooops');
        });
  }


  dosubmit(formval) {
    console.log(this.dataForm.valid);
    if (this.dataForm.valid) {
      let link= this.serverurl + 'editemployee';
      let data = {id: this.id,
        firstname: formval.fname,
        lastname: formval.lname,
        gender: formval.gender,
        address: formval.address,
        city: formval.city,
        state: formval.state,
        zip: formval.zip,
        email: formval.email,
        phoneno: formval.phoneno,
        date: formval.date,
      };
      console.log(this.dataForm.valid);
      console.log(data);
      this._http.post(link, data)
          .subscribe(data => {
            //this.router.navigate(['/adminlist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
