import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [Commonservices],                      //commonservice providers for connection with server
})
export class AddComponent implements OnInit {          //class component name implement here

  public dataForm: FormGroup;                       //dataForm creats for new data
  public es;                                       //create a variable
  public serverurl;                                //serverurl creates for function on node




  constructor(es: FormBuilder, private router: Router,  private _commonservices: Commonservices, private _http: HttpClient) {
    this.es = es;                                     //es name variable declare along with (this.)
    this.serverurl = _commonservices.url;             //serverurl initialize with commonservicesurl
  }

  ngOnInit() {
    this.dataForm = this.es.group({
      fname: ['', Validators.required],            //fname 'blank', and create validation
      lname: ['', Validators.required],            //lname 'blank', and create validators
      email: ['', Validators.compose([Validators.required, AddComponent.customValidator])], //email 'blank', and create validators
      //username:['',Validators.required],
      password:['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15)])], //password 'blank', composing means 1 or more validation create for..
      confirmPassword:['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15),
        this.equalToPass('password')  //confirm pass ''blank', equalTopass means if passwrd match or not..
      ])],
      address: ['',Validators.required],      //address 'blank', validators required
      telephoneno: ['', Validators.required],   ///telephoneno 'blank', validators required
      mobileno: ['', Validators.required]           ///mobileno. 'blank', validators required
    });
  }

  equalToPass(fieldname): ValidatorFn {                                 //password match custom function
    return (control: AbstractControl): { [key: string]: any } => {      ///abstractcontrol function call here with key string any type
      let input = control.value;      //class create here
      console.log('control.value');   //console.log for debugging
      console.log(control.value);
      console.log(control.root.value[fieldname]);
      let isValid = control.root.value[fieldname] == input;       //value valid or not
      console.log('isValid');                                     //debugging value valid
      console.log(isValid);                                    //valid debugging console
      if (!isValid)
        return{
          equalTo:true            //this value will be called
        };
    };
  }

  static customValidator(inputEmail): any{              //custom validator function call here for input email
    console.log('inputEmail');
    console.log(inputEmail);
    if(inputEmail.pristine){                           //pristine type validation for email valided
      return null;
    }
    inputEmail.markAsTouched();
    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;      //regexp validation
    console.log( String(inputEmail.value).search (filter) != -1);            //string type value with search filter
    if(String(inputEmail.value).search (filter) == -1){                 //value
      console.log('valid');
      return{
        invalidEmail:true                                    //this value will be called
      };
    }
  }

  dosubmit(formval) {                               //dosubmit create, we take full form
   // console.log(formval);
   // console.log(formval.fname);
   // console.log(formval.lname);

    let x: any;                                    //for in loop create
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();       //loopin dataForm and marksTouched
      /*console.log('this.dataForm.controls[x].valid');
      console.log(this.dataForm.controls[x]);
      console.log(this.dataForm.controls[x].valid);*/
    }
  /*  console.log("this.dataForm.value");
    console.log(this.dataForm.value);
    console.log("this.dataForm.valid");
    console.log(this.dataForm.valid);*/

    if (this.dataForm.valid ) {                              //if dataForm valid then
      let link = this.serverurl + 'adduser';                 ///serveurl + 'adduser' function call server.js
      let data = {
        firstname: formval.fname,            //formval creats in fname,lname,email,password,address,telephoneno,mobileno,
        lastname: formval.lname,
        email: formval.email,
       // username: formval.username,
        password: formval.password,
        address: formval.address,
        telephoneno: formval.telephoneno,
        mobileno: formval.mobileno,
        type: 'admin',                               //declare type here
      };
      this._http.post(link, data)                     //post details link with data
          .subscribe(res => {
            this.router.navigate(['/manageadmin']);
          }, error => {
            console.log('Oooops!');                   //error mssg
          });
    }
  }
}