import { Component, OnInit } from '@angular/core';
import {
    FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl,ValidationErrors
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {visitValue} from "@angular/compiler/src/util";
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-managecompany',
    templateUrl: './managecompany.component.html',
    styleUrls: ['./managecompany.component.css'],
    providers: [Commonservices],
})
export class ManagecompanyComponent implements OnInit {
    public dataForm: FormGroup;
    public eg;
    public serverurl;
    public id;
    constructor(eg: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private route: ActivatedRoute) {
        this.eg = eg;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            if(this.id!=null)
            {
                this.getcompanydetailsbyid(this.id);// it takes the id through params
            }
        });
        this.dataForm = this.eg.group(
            {
                  id: [""],/**/
                companyname: ["", Validators.required],
                description: ["", Validators.required]

            });
    }
    getcompanydetailsbyid(id:any) {
        let link = this.serverurl+'getcompanydetailsbyid';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.dataForm = this.eg.group(
                    {
                     //   id: [result.item[0]._id, Validators.required],
                        companyname: [result.item[0].companyname, Validators.required],
                        description: [result.item[0].description, Validators.required]  //through this we can update the value of the companydetails
                    });
            });
    }

    dosubmit(formval)
    {
        console.log('formval');
        console.log(formval);
        let link:any={};
        let data = {};
        if(typeof(this.id)=='undefined')
        {
            link = this.serverurl + 'managecompany';//if field is blank then back to managecompany
            if (this.dataForm.valid) {
                data = {
                    companyname: formval.companyname,
                    description: formval.description,
                }
            }
        }
        if(typeof(this.id)!='undefined') {
            link = this.serverurl + 'updatecompany';//if not then update details
            if (this.dataForm.valid) {
                data = {
                    id: this.id,
                    companyname: formval.companyname,
                    description: formval.description,
                }
            }
        }
        this._http.post(link, data)
            .subscribe(data => {
                    this.router.navigate(['/companylist']);
            }, error => {
                console.log('Oooops!');
            });

        /* console.log(formval);
           console.log(formval.companyname);
           console.log(formval.description);

           let y: any;
           for (y in this.dataForm.controls) {
           this.dataForm.controls[y].markAsTouched();
           }

           console.log("this.dataform.value");
           console.log(this.dataForm.value);
           console.log("this.dataform.valid");
           console.log(this.dataForm.valid);*/
    }

}

