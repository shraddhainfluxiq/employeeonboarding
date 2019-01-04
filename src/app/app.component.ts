import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'employeeonboarding';
}
