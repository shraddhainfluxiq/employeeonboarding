import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,ValidatorFn,FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editlesson',
  templateUrl: './editlesson.component.html',
  styleUrls: ['./editlesson.component.css'],
  providers:[Commonservices],
})
export class EditlessonComponent implements OnInit {
  public dataForm: FormGroup;
  public kp;
  public serverurl;
  public id;

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute, private _http: HttpClient) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
  }
}


