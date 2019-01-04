import { Component, OnInit ,TemplateRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
declare var $:any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  providers:[Commonservices],
})
export class TrainingComponent implements OnInit {
  public serverurl;
  public id;
  public companynamevalues;
  public companyids: any=[];
  public categoryvalues;
  public lessonvalues;
  public srcpath;
    modalRef: BsModalRef;

  constructor(private router: Router, private _commonservices: Commonservices, private _http: HttpClient,private cookeiservice: CookieService,private modalservice: BsModalService) {
    this.serverurl=_commonservices.url;
    this._http=_http;
    this.id = this.cookeiservice.get('userid');
    console.log(this.id);

  }

  ngOnInit() {
  this.getcompany();
  }
  getcompany()
  {
    let link=this.serverurl+'companyname';
    let data={id:this.id};
    this._http.post(link,data)
        .subscribe(res=>{
          let result:any;
          result=res;
          this.companynamevalues=result.res;
          console.log('companynamevalues');
          console.log(this.companynamevalues);
          if(this.companynamevalues.empcomp.length>0){
            for(let i in this.companynamevalues.empcomp){
              this.companyids.push(this.companynamevalues.empcomp[i].companyid);
            }
            this.getcategory();
          }
        })
  }
  getcategory(){
    let data={companyids:this.companyids};
    let link=this.serverurl+'categoryname';
    this._http.post(link,data)
        .subscribe(res=>{
          let result:any;
          result=res;
          console.log('++++++');
          console.log(result);
           this.categoryvalues=result.res;
           if(this.categoryvalues.length>0){
               this.getlessondetails(this.categoryvalues[0]._id);
           }
           console.log('categoryvalues');
           console.log(this.categoryvalues);

        })
  }

  getlessondetails(categoryid){
    let data={categoryids:categoryid};
    let link=this.serverurl+'lessonname';
    this._http.post(link,data)
        .subscribe(res=>{
          let result:any;
          result=res;
          console.log('++++++');
          console.log(result);
          this.lessonvalues=result.res;
          console.log('lessonvalues');
          console.log(this.lessonvalues);

        })
  }

   /* myHandler(e) {
        // What you want to do after the event
        console.log('video eneded ....');
    }*/

    ngAfterViewChecked() { //audio,video
        let serverurl=this.serverurl;
        setTimeout(() => {
          //  console.log($('.vplayer').length);
                $('.vplayer').each(function () {                   //This function is uded for call the video function
                  //  console.log($(this).attr('id'));
                    let video = document.getElementById($(this).attr('id').toString());
                    video.onended = function(e) {
                        /*Do things here!*/
                        console.log($(this).attr('id').replace('video','')+'ended of lesson.'+$(this).attr('lid'));
                        /*console.log(e);*/
                        //call server.js here
                        $.post("http://emponboarding.westcoastvg.online/server2.php?q=userlessoncomplete",
                            {
                                type:'Video',
                                lessonid:$(this).attr('lid'),
                                typeid:$(this).attr('id').replace('video','')
                            },
                            function(data, status){
                              //  alert("Data: " + data + "\nStatus: " + status);
                                console.log('userlessoncomplete');
                                console.log(data);
                                console.log(status);

                            });
                    };
                });
               /* document.getElementsByTagName('video').addEventListener('ended',this.myHandler(),false);*/
                $('.aplayer').each(function () {
                    //  console.log($(this).attr('id'));
                    let audio = document.getElementById($(this).attr('id').toString());

                    audio.onended = function(e) {
                        console.log('*****************'+$(this).attr('lid'));
                        /*Do things here!*/
                        console.log($(this).attr('id').replace('audio','')+'ended of lesson..'+$(this).attr('lid'));
                        console.log(e);
                        //call server.js here
                        $.post("http://emponboarding.westcoastvg.online/server2.php?q=userlessoncomplete",
                            {
                                type:'Audio',
                                lessonid:$(this).attr('lid'),
                                typeid:$(this).attr('id').replace('audio','')
                            },
                            function(data, status){
                                //  alert("Data: " + data + "\nStatus: " + status);
                                console.log('userlessoncomplete');
                                console.log(data);
                                console.log(status);

                            });
                    };

                });
        }
        , 2000);
    }

    openimagemodal(lessonid,typeid,scrpathis,imagetemplate:TemplateRef<any>){ //image
        this.srcpath=null;
        this.srcpath=scrpathis;
        this.modalRef = this.modalservice.show(imagetemplate);
        let data=
            {
                type:'Images',
                typeid:typeid,
                lessonid:lessonid
            };
        let link=this.serverurl+'userlessoncomplete';
        this._http.post(link,data)
            .subscribe(res=>{
                let result:any;
                result=res;
                console.log('userlessoncomplete');
                console.log(result);
            })
    }
    markasdone(lessonid,typeid){ //html
        let data=
            {
                type:'Text/Html',
                typeid:typeid,
                lessonid:lessonid
            };
        console.log(data);
        let link=this.serverurl+'userlessoncomplete';
        this._http.post(link,data)
            .subscribe(res=>{
                let result:any;
                result=res;
                console.log('userlessoncomplete');
                console.log(result);
            })
    }
}
