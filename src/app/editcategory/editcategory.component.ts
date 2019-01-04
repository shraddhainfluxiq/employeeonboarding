import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,ValidatorFn,FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css'],
  providers:[Commonservices],
})
export class EditcategoryComponent implements OnInit {
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
    if(this.id!=null){
      this.geteditcategorybyid(this.id);
    }
    });

    this.dataForm = this.ks.group(
        {
          //   id: [""],
          catname: ["", Validators.required],
          description: ["", Validators.required]

        });
  }

  geteditcategorybyid(id:any){


  }
  dosubmit(id:any){

  }
}
