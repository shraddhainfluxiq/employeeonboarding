import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-addlessoncat',
  templateUrl: './addlessoncat.component.html',
  styleUrls: ['./addlessoncat.component.css'],
  providers: [Commonservices],
})
export class AddlessoncatComponent implements OnInit {
    public dataForm: FormGroup;
    public es;
    public serverurl;
    public uploadurl;
    public fileurl;
    public uploadfile;
    public uploaderror;
    public selectedFile;
    public id;
    public lessonlist: any = [];
    public categorylist: any = [];


    constructor(es: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient,public route:ActivatedRoute) {
        this.serverurl =_commonservices.url;
        this.uploaderror = '';
        this.uploadfile = '';
        this.es = es;
        this.serverurl = _commonservices.url;
        this.uploadurl = _commonservices.uploadurl;
        this.fileurl = _commonservices.fileurl;
        this.getcategorylist();
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            if (this.id != null) {
                this.getlessondetailsbyid();// it takes the id through params
            }
        });

        this.dataForm = this.es.group({
            lename: ['', Validators.required],
            id: [''],
            letype: ['', Validators.required],
            description: ['', Validators.required],
            categories: ['', Validators.required],
            status: [true],


        });


    }

    getcategorylist() {
        let link = this.serverurl + 'categorylist';
        this._http.get(link)
            .subscribe(res => {
                let result;
                result = res;


                this.categorylist = result.res;
                console.log('this.categorylist ...');
                console.log(this.categorylist);

            }, error => {
                console.log('Oooops!');
            });

    }

    getlessondetailsbyid() {
        let link = this.serverurl + 'getlessondetailsbyid';
        let data = {id: this.id};
        console.log('this.id');
        console.log(this.id);
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.dataForm = this.es.group(
                    {
                        //   id: [result.item[0]._id, Validators.required],
                        lename: [result.item[0].lename, Validators.required],
                        letype: [result.item[0].letype, Validators.required],
                        description: [result.item[0].description, Validators.required],
                        categories: [result.item[0].categories, Validators.required],
                        status: [result.item[0].status, Validators.required],

                    });
            });
    }


    dosubmit(formval) {


        {
            let link: any = {};
            let data = {};
            if (typeof(this.id) == 'undefined') {
                link = this.serverurl + 'addlesson';//if field is blank then back to managecompany
                if (this.dataForm.valid) {
                    data = {
                        lename: formval.lename,
                        letype: formval.letype,
                        description: formval.description,
                        categories: formval.categories,
                        status: formval.status,

                    }
                }
            }
            if (typeof(this.id) != 'undefined') {
                link = this.serverurl + 'updatelesson';//if not then update details
                if (this.dataForm.valid) {
                    data = {
                        id: this.id,
                        lename: formval.lename,
                        letype: formval.letype,
                        description: formval.description,
                        categories: formval.categories,
                        status: formval.status,
                    }
                }
            }
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/alllessonlist']);
                }, error => {
                    console.log('Oooops!');
                });

            /*let x: any;
             for (x in this.dataForm.controls) {
             this.dataForm.controls[x].markAsTouched();
             console.log('this.dataForm.controls[x].valid');
             console.log(this.dataForm.controls[x]);
             console.log(this.dataForm.controls[x].valid);
             }
             if (this.dataForm.valid) {
             console.log('form is valid');
             let link = this.serverurl + 'addlesson';
             let data = {
             lename: formval.lename,
             letype: formval.letype,
             description: formval.description,
             status: formval.status,
             //type: 'admin',
             categories: formval.categories,
             };
             this._http.post(link, data)
             .subscribe(res => {
             this.router.navigate(['/alllessonlist']);
             }, error => {
             console.log('Oooops!');
             });
             }*/
        }

      /*  getlessonlist()
        {
            let link = this.serverurl + 'lessonlist?' + new Date().getTime();
            this._http.get(link)
                .subscribe(data => {
                    let result: any = {};
                    result = data;
                    this.lessonlist = [];
                    this.lessonlist = result.res;
                    console.log('this.lessonlist');
                    console.log(result);
                    console.log(this.lessonlist);

                }, error => {
                    console.log('oops!');
                })


        }
        category()
        {
            let link = this.serverurl + 'lessonlist?' + new Date().getTime();
            this._http.get(link)
                .subscribe(data => {
                    let result: any = {};
                    result = data;
                    this.lessonlist = result.res;
                })
        }*/
        /*onFileChanged(event)
        {
            this.uploaderror = '';
            this.selectedFile = event.target.files[0];

            const uploadData = new FormData();
            uploadData.append('file', this.selectedFile);

            this._http.post(this.uploadurl, uploadData)
                .subscribe(event => {
                    let res: any;
                    res = event;
                    if (res.error_code == 0) {
                        this.uploadfile = this.fileurl + res.filename;
                    } else {
                        this.uploaderror = res.msg;
                    }
                });
        }*/
    }
}
