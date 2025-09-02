import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {LoginComponent} from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HomeComponent } from './home/home.component';
import {MyClaimComponent} from './my-claim/my-claim.component';
//import {ClaimDetailsComponent} from './claim-details/claim-details.component';
import {NewsAnnouncementsComponent} from './news-announcements/news-announcements.component';
import {QueriesResponseComponent} from './queries-response/queries-response.component';
import {CreateNewComponent} from './create-new/create-new.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {PaymentsComponent} from './payments/payments.component';
import {NoDueComponent} from './no-due/no-due.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-new', component: CreateNewComponent},
  { path: 'my-claim', component: MyClaimComponent },
  // { path: 'claim-details', component: ClaimDetailsComponent},
  { path: 'news-announcements', component: NewsAnnouncementsComponent},
  { path: 'queries-response', component: QueriesResponseComponent},
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'payments', component: PaymentsComponent}, 
  { path: 'no-due', component: NoDueComponent}, 
  { path: 'home', component:HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
