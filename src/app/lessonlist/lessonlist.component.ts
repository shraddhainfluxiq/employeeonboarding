import { Component, OnInit,TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-lessonlist',
  templateUrl: './lessonlist.component.html',
  styleUrls: ['./lessonlist.component.css'],
  providers:[Commonservices],
})
export class LessonlistComponent implements OnInit {
    public datalist:any=[];
    public serverurl;
    public uploadurl;
    public fileurl;
    public uploadfile;
    public uploaderror;
    public selectedFile;
    public message:any='';
    public id:any;
    modalRef:BsModalRef;
    modalRef1:BsModalRef;
    modalRef2:BsModalRef;
    private selectedlessonid: any;
    private selectid:any;
    private selectedid:any;
    private modalref: BsModalRef;
    private lessonfilearray: any;
    public selectedtype: any;
    public selectedtexttype:any;
    public seltypes: any;
    public lessonvalues:any;
    public categorylist:any=[];
    public a:any=[];
    public documentval:any='';
    public msg:any=false;
    public documentvalerror=false;




  constructor(private router: Router,  private _commonservices: Commonservices, private _http: HttpClient,private modalservice:BsModalService,private route: ActivatedRoute) {
      this.serverurl = _commonservices.url;
    this.uploaderror = '';
    this.uploadfile = '';
    this.serverurl = _commonservices.url;
    this.uploadurl = _commonservices.uploadurl;
    this.fileurl = _commonservices.fileurl;


  }

  ngOnInit() {

   // this.a=this.getcategorylist();
      let link = this.serverurl + 'categorylist?' + new Date().getTime();
      console.log('data');
      console.log(link);
      this._http.get(link)
          .subscribe(res => {
              let result;
              result = res;


              this.categorylist = result.res;
             // return this.categorylist;
              console.log('this.categorylist');
              console.log(this.categorylist);

          }, error => {
              console.log('Oooops!');
          });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      if(this.id!=null){
        this.getlessonlistbyid();
      }else this.getlessonlist();
    });

  }
    showcatname(categories){
      var catnamearr = [];
      if(Array.isArray(categories)){
          for(let i in this.categorylist){
              var catid = this.categorylist[i]._id;
              if(categories.indexOf(catid) != -1){
                  catnamearr.push(this.categorylist[i].catname);
              }
          }
      }
        return catnamearr.join();



    }

  getcategorylist()
  {
      let link = this.serverurl + 'categorylist?' + new Date().getTime();
      this._http.get(link)
          .subscribe(res => {
              let result;
              result = res;


              this.categorylist = result.res;
              return this.categorylist;

          }, error => {
              console.log('Oooops!');
          });


  }

    onChange(ev){

        console.log('on change ....');

    }

  getlessonlist()
  {
    let link=this.serverurl+'lessonlist?'+new Date().getTime();
    this._http.get(link)
        .subscribe(res => {
          let result;
          result = res;
          this.datalist = [];
          this.datalist = result.res;
          console.log(this.datalist);

        }, error => {
          console.log('Oooops!');
        });

  }

  getlessonlistbyid()
  {
    let link=this.serverurl+'lessonlistbycatid';
    this._http.post(link,{id:this.id})
        .subscribe(res => {
          let result;
          result = res;
          this.datalist = [];
          this.datalist = result.res;
          console.log(this.datalist);

        }, error => {
          console.log('Oooops!');
        });

  }
  getfilename(val:any){
    return val.replace('http://emponboarding.westcoastvg.online/php/uploads/','');
  }
  getfiletype(val:any){
    let tval=val.split('.');
    return tval[tval.length-1].toLowerCase();
  }
  managevideo(id:any,template:TemplateRef<any>)
  {
      this.lessonfilearray=[];
      this.selectedtype=id.letype;
      console.log('this.selectedtype');
      console.log(this.selectedtype);
      if(this.selectedtype=='Files'){
          this.seltypes=".pdf,.docx";
      }
      if(this.selectedtype=='Audio'){
          this.seltypes=".mp3,.m4a,.wav,.webm,.wma,.aac";
      }
      if(this.selectedtype=='Video'){
          this.seltypes=".webm,.mkv,.flv,.vob,.wmv,.mp4,.mpeg,.3qp,.mpg";
      }
      if(this.selectedtype=='Images'){
          this.seltypes=".jpeg,.gif,.jpeg,.JPEG,.png,.bmp,.tiff";
      }
      /*if(this.seltypes=='Text/Html'){
          this.seltypes=".txt,.doc,.docx,.rtf,.html,.htm";
      }*/
      this.modalref=this.modalservice.show(template);
      this.selectedid=id._id;


     this.getlessonfilesbyid();


  }


  managecontent(id:any,template:TemplateRef<any>)
  {
      this.msg=false;
     this.modalRef1=this.modalservice.show(template);

     //this.selectedid=id._id;
      console.log('managecontent selectedid');
      console.log(id);
    //  console.log(id._id);
      this.selectedid=id._id;
    //  console.log(this.selectedid);

      let link = this.serverurl + 'getfilesoflessonbyid';
      let data = {id: this.selectedid};

      this._http.post(link, data)
          .subscribe(res => {
              let result:any;
              result = res;
              //    console.log(result);
              if (result.status == 'success') {

                  console.log('managecontent result');
                  console.log(result);
                  if(result.item.length>0){
                      this.documentval=result.item[0].file
                  }else{
                      this.documentval='';
                  }
              }
          }, error => {
              console.log('Oooops!');
          });



  }

  addcontent(template:TemplateRef<any>)
  {
      console.log('this.documentval '+this.documentval);
      this.documentvalerror=false;
     //this.modalRef1=this.modalservice.show(template);
     //this.selectedid=id.letype;
      if(this.documentval==null || this.documentval=='' )
      {
          this.documentvalerror=true;
      }
      else {
          console.log('selectedid');
          console.log(this.selectedid);
          console.log(this.documentval);
          //this.modalRef.hide();
          let link = this.serverurl + 'addlessonfile';
          let data = {id: this.selectedid, file: this.documentval, type: 'html'};  //

          this._http.post(link, data)
              .subscribe(res => {
                      let result: any;
                      result = res;
                      console.log(result.status);
                      console.log('------result.status---------');
                      console.log(result.status);
                      if (result.status == 'success') {
                          console.log(' addcontent result');
                          console.log(result);
                          if (result.status == 'success') {
                              setTimeout(() => {
                                  //  this.getlessonfilesbyid();
                                  this.modalRef1.hide();
                                  this.message = 'Text Message saved successfully !!!!';
                                  this.modalRef2 = this.modalservice.show(template);
                                  setTimeout(() => {
                                      this.modalRef2.hide();
                                  }, 4000);
                              }, 1000);
                          }
                      }
                  },

                  error => {
                      console.log('Oooops!');
                  });


      }
  }
  getlessonfilesbyid(){
    let link = this.serverurl + 'getfilesoflessonbyid';
    let data = {id: this.selectedid};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          //    console.log(result);
          if (result.status == 'success') {

            console.log('getfilesoflessonbyid result');
            console.log(result);
            this.lessonfilearray=result.item;
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  show(id:any,template:TemplateRef<any>)
  {
    this.message="video";

  }

  deletelessonfiles(id:any)
  {
    this.selectid=id;
    console.log('id');
    console.log(id);

    let link=this.serverurl+'deletefiles';
    let data={id:id._id};
    //this.modalRef.hide();

    this._http.post(link,data)
        .subscribe(res=>{
          let result:any;
          result=res;
          if(result.status=='success'){
            //this.modalRef=this.modalservice.show(template);
            setTimeout(() => {
              this.getlessonfilesbyid();

                this._http.get(this._commonservices.filedeleteurl+'?file='+this.getfilename(id.file))
                    .subscribe(res=>{
                        let result:any;
                        result=res;
                        if(result.status=='success'){
                            //this.modalRef=this.modalservice.show(template);

                        }
                    }, error => {
                        console.log('Oooops!');
                    });

              //this.modalRef.hide();
            }, 1000);
          }
        }, error => {
          console.log('Oooops!');
        });
  }
  deletef(id:any,template:TemplateRef<any>)
  {
    this.message="File Deleted Successfully";
    let link=this.serverurl+'deletefiles';
    let data={id:id};
    this.modalRef.hide();

    this._http.post(link,data)
        .subscribe(res=>{
          let result:any;
          result=res;
          if(result.status=='success'){
            this.modalRef=this.modalservice.show(template);
            setTimeout(() => {

              this.modalRef.hide();
            }, 4000);
          }
        }, error => {
          console.log('Oooops!');
        });

  }



  deletelesson(id: any, template: TemplateRef<any>) {
    this.modalRef = this.modalservice.show(template);
    this.selectedlessonid = id;
  }

  delete(id: any, template: TemplateRef<any>) {
    this.message = "Lesson Deleted successfully!";
    let link = this.serverurl + 'deletelesson';
    let data = {id: id};
    this.modalRef.hide();

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          //    console.log(result);
          if (result.status == 'success') {
            this.modalRef2 = this.modalservice.show(template);
            setTimeout(() => {

              this.getlessonlist();
              this.modalRef2.hide();
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

    documentopen()
    {
        this.msg=true;
    }


    onFileChanged(event) {
        console.log('event');
        console.log(event);
        this.uploaderror = '';
        this.selectedFile = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);

    this._http.post(this.uploadurl, uploadData)
        .subscribe(event => {
          var res :any;
          res = event;
          if(res.error_code == 0){
            this.uploadfile = this.fileurl + res.filename;
            console.log('res');
            console.log(res);
            let link = this.serverurl + 'addlessonfile';
            let data = {id: this.selectedid,file:this.uploadfile};

            this._http.post(link, data)
                .subscribe(res => {
                  let result:any;
                  result = res;
                  //    console.log(result);
                  if (result.status == 'success') {

                    console.log('result');
                    console.log(result);
                    this.getlessonfilesbyid();
                  }
                }, error => {
                  console.log('Oooops!');
                });
          }else{
            this.uploaderror = res.msg;
          }
        });

       /* onFileChanged1(event)
        {
            console.log('event');
            console.log(event);
            this.uploaderror='';
            this.selectedFile=event.target.files[0];

            const uploadData=new FormData();
            uploadData.append('file', this.selectedFile);

            this._http.post(this.uploadurl, uploadData)
                .subscribe(event => {
                    var res :any;
                    res = event;
                    if(res.error_code == 0){
                        this.uploadfile = this.fileurl + res.filename;
                        console.log('res');
                        console.log(res);
                        let link = this.serverurl + 'addlessontext';
                        let data = {id: this.selectedid,file:this.uploadfile};

                        this._http.post(link, data)
                            .subscribe(res => {
                                let result:any;
                                result = res;
                                //    console.log(result);
                                if (result.status == 'success') {

                                    console.log('result');
                                    console.log(result);
                                    this.getlessonfilesbyid();
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }else{
                        this.uploaderror = res.msg;
                    }
                });


        }*/
    /*this._http.post(this.uploadurl,uploadData)
        .subscibe(event=> {
          let data:{id:id};
          res=event;
          if(res.error_code==0)
          {
            this.uploadfile=this._id;
            this.uploadfile=this.
          }
        })*/
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
