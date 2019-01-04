/**
 * Created by INFLUXIQ-04 on 31-10-2018.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from '../src/app/dashboard/dashboard.component';
import {LoginComponent} from '../src/app/login/login.component';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AdminheaderComponent} from "../src/app/adminheader/adminheader.component";
import {AdminfooterComponent } from "../src/app/adminfooter/adminfooter.component";
import {AdminleftComponent } from "../src/app/adminleft/adminleft.component";
import {AddComponent } from "../src/app/add/add.component";
import {EditComponent }from "../src/app/edit/edit.component";
import {DeleteComponent} from"../src/app/delete/delete.component";
import {AddemployeeComponent} from "../src/app/addemployee/addemployee.component";
import {ManagecompanyComponent} from "../src/app/managecompany/managecompany.component";
import {EditemployeeComponent} from "../src/app/editemployee/editemployee.component";
import {ForgotComponent} from "../src/app/forgot/forgot.component";
import {ChangepassComponent} from "../src/app/changepass/changepass.component";
import {PracticeComponent} from "../src/app/practice/practice.component";
import {ManageadminComponent} from "../src/app/manageadmin/manageadmin.component";
import {ManageemployeeComponent} from "../src/app/manageemployee/manageemployee.component";
import {MyaccountComponent} from "./app/myaccount/myaccount.component";
import {CompanylistComponent} from "./app/companylist/companylist.component";
import {TrainingComponent} from"./app/training/training.component";
import {TheaderComponent} from "./app/theader/theader.component";
import {TfooterComponent} from "./app/tfooter/tfooter.component";
import {ManageonboardingComponent} from "./app/manageonboarding/manageonboarding.component";
import {AddlessoncatComponent} from "./app/addlessoncat/addlessoncat.component";
import {AddlessoncategoryComponent}from "./app/addlessoncategory/addlessoncategory.component";
import {CategorylistComponent}from "./app/categorylist/categorylist.component";
import {EditcategoryComponent} from "./app/editcategory/editcategory.component";
import {LessonlistComponent} from "./app/lessonlist/lessonlist.component";
/*import{EditlessonComponent}*/


const appRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent},
    {path: 'loginold',component: LoginComponent},
    {path: '',component: PracticeComponent},
    {path: 'adminheader',component: AdminheaderComponent},
    {path: 'adminfooter',component: AdminfooterComponent},
    {path: 'adminleft',component: AdminleftComponent},
    {path: 'addadmin' ,component: AddComponent},
    {path: 'editadmin/:id' ,component:EditComponent},
    {path: 'delete',component:DeleteComponent},
    {path: 'addemployee',component: AddemployeeComponent},
    {path: 'managecompany',component:ManagecompanyComponent},
    {path: 'editcompany/:id',component:ManagecompanyComponent},
    {path: 'editemployee/:id',component:EditemployeeComponent},
    {path: 'forgot',component:ForgotComponent},
    {path: 'changepass',component:ChangepassComponent},
    {path: 'login',component:PracticeComponent},
    {path: 'manageadmin',component:ManageadminComponent},
    {path: 'manageemployee',component:ManageemployeeComponent},
    {path: 'myaccount',component:MyaccountComponent},
    {path: 'companylist',component:CompanylistComponent},
    {path:'training',component:TrainingComponent},
    {path:'theader',component:TheaderComponent},
    {path:'tfooter',component:TfooterComponent},
    {path:'manageonboarding',component:ManageonboardingComponent},
    {path:'addlesson',component:AddlessoncatComponent},
    {path:'editlesson/:id',component:AddlessoncatComponent},
    {path:'addlessoncategory',component:AddlessoncategoryComponent},
    {path:'editlessoncategory/:id',component:AddlessoncategoryComponent},
    {path:'categorylist',component:CategorylistComponent},
    {path:'editcategory/:id',component:EditcategoryComponent},
    {path:'lessonlist/:id',component:LessonlistComponent},
    {path:'alllessonlist',component:LessonlistComponent},
    /*{path:'editlesson',component:LessonlistComponent},*/






];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: false });
