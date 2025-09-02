import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TabModule} from 'angular-tabs-component';
import {DataTablesModule} from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyClaimComponent } from './my-claim/my-claim.component';
import { NewsAnnouncementsComponent } from './news-announcements/news-announcements.component';
import { QueriesResponseComponent } from './queries-response/queries-response.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentsComponent } from './payments/payments.component';
import { NoDueComponent } from './no-due/no-due.component';
import { CommonModule } from '@angular/common';
import { TestDirDirective } from './test-dir.directive';
import { UploadFile } from './upload-file';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TopHeaderComponent,
    FooterComponent,
    DashboardComponent,
    MyClaimComponent,
    NewsAnnouncementsComponent,
    QueriesResponseComponent,
    CreateNewComponent,
    ClaimDetailsComponent,
    LoginComponent,
    MyProfileComponent,
    PaymentsComponent,
    NoDueComponent,
    TestDirDirective,  
    UploadFile
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    DataTablesModule,
    AppRoutingModule,
    CommonModule,
    TabModule,
    //NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
