import { Component, OnInit ,TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators,ValidatorFn,FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css'],
  providers:[Commonservices],
})
export class CategorylistComponent implements OnInit {
  public serverurl;
  public categorylist:any=[];
  public companylist:any=[];
  public message:any='';
  modalRef: BsModalRef;
  private selectedempid: any;
  public datalist: any=[];




  constructor(private router: Router, private _commonservices: Commonservices, private _http: HttpClient,private modalservice: BsModalService) {

    this.serverurl = _commonservices.url;
  }


  ngOnInit() {

    this.getcompanylist();

  }

  getcategorylist()
  {
    let link = this.serverurl + 'categorylist?' + new Date().getTime();
    this._http.get(link)
        .subscribe(res => {
          let result;
          result = res;


          this.datalist = result.res;
          console.log('this.categorylist ...');
          console.log(this.categorylist);

        }, error => {
          console.log('Oooops!');
        });

  }


    getcomp(item:any,template:TemplateRef<any>){

      console.log('item');
      console.log(item);
      this.message='';
      for(let c in item){
          for(let p in this.companylist){
              if(this.companylist[p]._id==item[c]) {
                  this.message+=this.companylist[p].companyname+', ';
              }
          }
      }
      if(this.message!='') {
          this.message=this.message.substr(0,this.message.length-2);
          this.modalRef = this.modalservice.show(template);
      }
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
                console.log(result);
                this.getcategorylist();
                console.log(this.companylist);

            }, error => {
                console.log('oops!');
            })
    }

  deletecategory(id: any, template: TemplateRef<any>) {
    this.modalRef = this.modalservice.show(template);
    this.selectedempid = id;
  }

  delete(id: any, template: TemplateRef<any>) {
    this.message = "Category Deleted successfully!";
    let link = this.serverurl + 'deletecategory';
    let data = {id: id};
    this.modalRef.hide();

    this._http.post(link, data)
        .subscribe(res => {
            let result;
            result = res;
            //    console.log(result);
            if (result.status == 'success') {
                this.modalRef = this.modalservice.show(template);
                setTimeout(() => {

                    this.getcategorylist();
                    this.modalRef.hide();
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
