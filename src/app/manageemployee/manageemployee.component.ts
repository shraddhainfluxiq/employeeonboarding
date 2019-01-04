import { Component, OnInit,TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-manageemployee',
  templateUrl: './manageemployee.component.html',
  styleUrls: ['./manageemployee.component.css'],
  providers: [Commonservices],
})
export class ManageemployeeComponent implements OnInit {
    public datalist: any = [];
    public companylist:any=[];
    public serverurl;
    public message: any = '';
    modalRef: BsModalRef;
    private selectedempid: any;
    public companyval:any=[];


    constructor(private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private modalservice: BsModalService) {
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.getEmployeeList();
        this.getcompanylist();
       /* /!**!/this.router.navigate(['/product-list']*/
    }

    getEmployeeList() {
        let link = this.serverurl + 'employeelist?' + new Date().getTime();
        this._http.get(link)
            .subscribe(res => {
                let result;
                result = res;


                this.datalist = result.res;
                console.log(this.datalist);

            }, error => {
                console.log('Oooops!');
            });

    }


    getcompanylist() {
        let link = this.serverurl + 'companylist?' + new Date().getTime();
        this._http.get(link)
            .subscribe(data => {
                let result: any = {};
                result = data;
                this.companylist = [];
                this.companylist = result.res;
                console.log('this.companylist');
                console.log(this.companylist);


            }, error => {
                console.log('oops!');
            })
    }
    update(id:any,template:TemplateRef<any>){
        /*this.message="Company updated successfully!!";*/
        console.log('this.companyval');
        console.log(this.companyval);
        console.log('userid==='+this.selectedempid);
        let link=this.serverurl+'updateemployeecompany';
        let data:any={};
        data={userid:this.selectedempid,companyids:this.companyval}
        this._http.post(link,data)
            .subscribe(data=>{
                let result:any=[];
                result=data;
                this.modalRef.hide();
                this.getEmployeeList();

            });
        console.log('updatecompany');

    }


    addcomp(id:any,template:TemplateRef<any>){
        this.selectedempid=id._id;
        this.companyval=[];
        console.log(id.empcomp);
        for(let n in id.empcomp){
            this.companyval.push(id.empcomp[n].companyid);
        }
        this.modalRef=this.modalservice.show(template);

    }

    deleteemployee(id: any, template: TemplateRef<any>) {
        this.modalRef = this.modalservice.show(template);
        this.selectedempid = id;
    }

    delete(id: any, template: TemplateRef<any>) {
        this.message = "Employee deleted successfully!";
        let link = this.serverurl + 'deleteemp';
        let data = {id: id};
        this.modalRef.hide();

        this._http.post(link, data)
            .subscribe(res => {
                let result;
                result = res;
                //    console.log(result);
                if (result.status == 'success') {
                    setTimeout(() => {
                        this.modalRef = this.modalservice.show(template);
                        this.getEmployeeList();
                    }, 4000);
                }
            }, error => {
                console.log('Oooops!');
            });

    }

    decline() {
        this.message = 'Declined!';
        this.modalRef.hide();
    }
   unixtodatetimeConverter(flag,UNIX_timestamp){
        var a = new Date(UNIX_timestamp );
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = (months[a.getMonth()]);
        if(typeof(month)=='undefined') return UNIX_timestamp;
        else {
            if (month.toString().length == 1) month = '0' + month;
            var date = (a.getDate());
            if (date < 10) var dates = '0' + date.toString();
            else var dates = date.toString();
            var hours = (a.getHours());
            if (hours < 10) var hour = '0' + hours;
            else var hour = hours.toString();
            var min = (a.getMinutes());
            if (min.toString().length == 1) var mins = '0' + min;
            else var mins = min.toString();
            var sec = (a.getSeconds());
            if (sec.toString().length == 1) var secs = '0' + sec;
            else var secs = sec.toString();
            var ampm = ((hours) >= 12) ? "PM" : "AM";
            if (flag == 0)var time = month + '-' + dates + '-' + year;
            if (flag == 1)var time = hour + ':' + mins + ':' + secs + " " + ampm;
            return time;
        }
    }

}

