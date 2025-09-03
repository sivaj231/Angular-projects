import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ApplicationmasterComponent } from './applicationmaster/applicationmaster.component';
import { ApproverComponent } from './approver/approver.component';
import { BranchmasterComponent } from './branchmaster/branchmaster.component';
import { FunctionalheadComponent } from './functionalhead/functionalhead.component';
import { CreateformComponent } from './createform/createform.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { SearchComponent } from './search/search.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { Header2Component } from './header2/header2.component';
import { UploadComponent } from './upload/upload.component';
import { UserComponent } from './user/user.component';
import { ApplicationmodulemasterComponent } from './applicationmodulemaster/applicationmodulemaster.component';
import { ModulemasterComponent } from './modulemaster/modulemaster.component';
import { ItApproverComponent } from './it-approver/it-approver.component';
import { ApproverViewComponent } from './approver-view/approver-view.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    ApplicationmasterComponent,
    ApproverComponent,
    BranchmasterComponent,
    FunctionalheadComponent,
    CreateformComponent,
    ManageuserComponent,
    SearchComponent,
    DepartmentmasterComponent,
    Header2Component,
    UploadComponent,
    UserComponent,
    ApplicationmodulemasterComponent,
    ModulemasterComponent,
    ItApproverComponent,
    ApproverViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
