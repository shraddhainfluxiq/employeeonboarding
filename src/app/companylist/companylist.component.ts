import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import {template} from "@angular/core/src/render3";


@Component({
    selector: 'app-companylist',
    templateUrl: './companylist.component.html',
    styleUrls: ['./companylist.component.css'],
    providers:[Commonservices],
})
export class CompanylistComponent implements OnInit {
    public datalist: any = [];
    public serverurl: any;
    public message:any='';
    modalRef:BsModalRef;
    public selectedcompanyid: any;

    constructor(private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private modalservice: BsModalService) {
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.getcompanylist();

    }

    getcompanylist() {
        let link = this.serverurl + 'companylist?' + new Date().getTime();
        this._http.get(link)
            .subscribe(data => {
                let result: any = {};
                result = data;
                this.datalist = [];
                this.datalist = result.res;
                console.log('this.datalist');
                console.log(result);
                console.log(this.datalist);

            }, error => {
                console.log('oops!');
            })
    }
    deletecompany(id:any, template:TemplateRef<any>){
        this.modalRef=this.modalservice.show(template);
        this.selectedcompanyid=id;


    }
    delete(id:any,template:TemplateRef<any>){
        this.message="company deleted successfully!!";
        let link=this.serverurl +'deletecompany';
        let data={id:id};
        this.modalRef.hide();

        this._http.post(link,data)
            .subscribe(res => {
                let result;
                result = res;
                //    console.log(result);
                if(result.status=='success'){
                    setTimeout(()=> {
                        this.modalRef = this.modalservice.show(template);
                        this.getcompanylist();
                    }, 4000);
                }
            }, error => {
                console.log('Oooops!');
            });

    }
    decline()
    {
        this.message='Declined!';
        this.modalRef.hide();
    }


}

