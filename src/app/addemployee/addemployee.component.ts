import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,ValidatorFn,FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import {visitValue} from "@angular/compiler/src/util";


@Component({
    selector: 'app-addemployee',
    templateUrl: './addemployee.component.html',
    styleUrls: ['./addemployee.component.css'],
    providers: [Commonservices],
})
export class AddemployeeComponent implements OnInit {

    public dataForm: FormGroup;
    public ks;
    public serverurl;

    constructor(ks: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient) {
        this.ks = ks;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {

        this.dataForm = this.ks.group(
            {
                fname: ['', Validators.required],
                lname: ['', Validators.required],
                gender: ['', Validators.required],
                address: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zip: ['', Validators.required],
                email: ['', Validators.compose([Validators.required, AddemployeeComponent.customValidator])],
                password:['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15)])],
                cpassword:['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15),
                    this.equalToPass('password')
                ])],


                phoneno: ['', Validators.required],
               // / date: ['', Validators.required]
            });

    }
    equalToPass(fieldname): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            let input = control.value;
            console.log('control.value');
            console.log(control.value);
            console.log(control.root.value[fieldname]);
            let isValid = control.root.value[fieldname] == input;
            console.log('isValid');
            console.log(isValid);
            if (!isValid)
                return{
                    equalTo:true
                };
        };
    }

    static customValidator(inputEmail): any{
        console.log('inputEmail');
        console.log(inputEmail);
        if(inputEmail.pristine){
            return null;
        }
        inputEmail.markAsTouched();
        let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        console.log( String(inputEmail.value).search (filter) != -1);
        if(String(inputEmail.value).search (filter) == -1){
            console.log('valid');
            return{
                invalidEmail:true
            };
        }
    }



    dosubmit(formval) {
        console.log(formval);
        console.log(formval.fname);
        console.log(formval.lname);
        console.log(formval.gender);
        console.log(formval.address);
        console.log(formval.city);
        console.log(formval.state);
        console.log(formval.zip);
        console.log(formval.email);
        console.log(formval.password);
        console.log(formval.cpassword);
        console.log(formval.phoneno);
        // console.log(formval.date);


        let y: any;
        for (y in this.dataForm.controls) {
            this.dataForm.controls[y].markAsTouched();
        }

        console.log("this.dataform.value");
        console.log(this.dataForm.value);
        console.log("this.dataform.valid");
        console.log(this.dataForm.valid);

        if (this.dataForm.valid) {
            let link = this.serverurl + 'addemployee';
            let data = {
                firstname: formval.fname,
                lastname: formval.lname,
                gender: formval.gender,
                address: formval.address,
                city: formval.city,
                state: formval.state,
                zip: formval.zip,
                email: formval.email,
                password:formval.password,
                phoneno: formval.phoneno,
                date: formval.date,
                type: 'employee',
            };
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/manageemployee']);
                }, error => {
                    console.log('Oooops!');

                });

        }
    }

}


