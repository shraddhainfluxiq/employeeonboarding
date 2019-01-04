import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addlessoncategory',
  templateUrl: './addlessoncategory.component.html',
  styleUrls: ['./addlessoncategory.component.css'],
  providers:[Commonservices],
})
export class AddlessoncategoryComponent implements OnInit {
  public dataForm: FormGroup;
  public es;
  public serverurl;
  public id;
  public companylist:any[];

  constructor( es: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient,private route: ActivatedRoute,) {
  this.es = es;
  this.serverurl = _commonservices.url;
  this.getcompanylist();

      this.route.params.subscribe(params => {
          this.id = params['id'];
          console.log(this.id);
          if(this.id!=null){
              this.getcategorydetailbyid();
          }
      });

}


ngOnInit() {
    this.dataForm=this.es.group({
        catname:['',Validators.required],
        id:[''],
        description:['',Validators.required],
        companies:['',Validators.required],
        status:[true],

    });
}

    getcategorydetailbyid(){

        let link = this.serverurl + 'getlessoncategorydetailbyid';
        let dataval:any={};
        dataval={cid:this.id};
        this._http.post(link,dataval)
            .subscribe(data => {
                let result: any = {};
                result = data;
                let res:any={};
                res=result.item[0];
                this.dataForm=this.es.group({
                    catname:[res.catname,Validators.required],
                    id:[res._id,Validators.required],
                    description:[res.description,Validators.required],
                    companies:[res.companies,Validators.required],
                    status:[res.status],

                });

                console.log('result');
                console.log(result);
                console.log('res');
                console.log(res);

            }, error => {
                console.log('oops!');
            })

    }
    dosubmit(formval)
    {

        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
            console.log('this.dataForm.controls[x].valid');
            console.log(this.dataForm.controls[x]);
            console.log(this.dataForm.controls[x].valid);
        }
        if (this.dataForm.valid ) {
            console.log('form is valid');
            let link = '';
               if(formval.id=='') link=this.serverurl + 'addlessoncategory';
               if(formval.id!='') link=this.serverurl + 'editlessoncategory';
            let data = {
                catname: formval.catname,
                description:formval.description,
                companies:formval.companies,
                status:formval.status,
                id:formval.id,

                //type: 'admin',

            };
            if(formval.catname.length>0) {
                this._http.post(link, data)
                    .subscribe(res => {
                        this.router.navigate(['/categorylist']);
                    }, error => {
                        console.log('Oooops!');
                    });
            }
        }
    }
    getcompanylist()
  {
    let link = this.serverurl + 'companylist?' + new Date().getTime();
    this._http.get(link)
        .subscribe(data => {
          let result: any = {};
          result = data;
          this.companylist = [];
          this.companylist = result.res;
          console.log('this.companylist');
          console.log(result);
          console.log(this.companylist);

        }, error => {
          console.log('oops!');
        })
  }



}
