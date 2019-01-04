/**
 * Created by kta pc on 7/25/2017.
 */
import {Injectable} from '@angular/core';
//import {Http, Response} from '@angular/http';
import {  HttpClient } from '@angular/common/http';
@Injectable()
export class Commonservices {
    items: Array<any>;
    url: any;
    uploadurl: any;
    fileurl: any;
    public filedeleteurl: string;


   // constructor(private http: Http) {
    constructor(private http: HttpClient) {
      //  this.url = 'http://132.148.90.242/server.php?q=';
        this.uploadurl = 'http://emponboarding.westcoastvg.online/php/fileupload.php';
        this.filedeleteurl = 'http://emponboarding.westcoastvg.online/php/scrappage.php';
        this.fileurl = 'http://emponboarding.westcoastvg.online/php/uploads/';
        this.url = 'http://emponboarding.westcoastvg.online/server2.php?q=';
        /*  if (window.location.hostname == 'localhost') {
           this.url = 'http://localhost:3000/';
        } else {
          //  this.url = 'http://influxiq.com:3014/';
            this.url = 'http://geofencedsp.com:3000/';
        }*/
    }
}
