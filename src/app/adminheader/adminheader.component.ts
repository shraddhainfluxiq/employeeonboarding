import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  providers: [Commonservices],
})
export class AdminheaderComponent implements OnInit {
  public userid: any;
  public email: any;
  public firstname: any;
  public lastname: any;
  public type: any;

  constructor(private router: Router,  private _commonservices: Commonservices, private _http: HttpClient, private cookeiservice: CookieService) {

    this.userid = this.cookeiservice.get('userid');
    this.email = this.cookeiservice.get('useremail');
    this.firstname = this.cookeiservice.get('userfirstname');
    this.lastname = this.cookeiservice.get('userlastname');
    this.type = this.cookeiservice.get('usertype');
    console.log('this.email');
    console.log(this.email);
    console.log(this.userid);
    if(this.userid==null || this.userid==''){

      this.router.navigate(['/login']);
    }


  }
  logout(){
    this.cookeiservice.deleteAll();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
