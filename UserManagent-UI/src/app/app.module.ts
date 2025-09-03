import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BranchComponent } from './components/masters/branch/branch.component';
import { DataTablesModule } from 'angular-datatables';
import { DepartmentComponent } from './components/masters/department/department.component';
import { ApplicationMasterComponent } from './components/masters/application-master/application-master.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { CommonModule } from '@angular/common';
import { ItAssetComponent } from './components/masters/it-asset/it-asset.component';
import { AssetComponent } from './components/masters/asset/asset.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { RoleManagementComponent } from './components/masters/role-management/role-management.component';
import { UserManagementComponent } from './components/masters/user-management/user-management.component';
import { ItSupportMappingComponent } from './components/masters/it-support-mapping/it-support-mapping.component';
import { AppRoleMappingComponent } from './components/masters/app-role-mapping/app-role-mapping.component';
import { AppownerComponent } from './components/masters/appowner/appowner.component';
import { DesignationComponent } from './components/masters/designation/designation.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpCalIInterceptor } from './security/HttpCalIInterceptor';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerComponent } from './components/ngx-spinner/ngx-spinner.component';
import { AssetMappingComponent } from './components/masters/asset-mapping/asset-mapping.component';
import { CompanypolicyComponent } from './components/companypolicy/companypolicy.component';
import { CommonDriveComponent } from './components/masters/common-drive/common-drive.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { ItSupportDashboardComponent } from './components/it-support-dashboard/it-support-dashboard.component';
import { BranchHierarchyComponent } from './components/branch-hierarchy/branch-hierarchy.component';
import { AuppolicyComponent } from './components/auppolicy/auppolicy.component';
import { ComplianceComponent } from './components/compliance/compliance.component';
import { CompliancesComponent } from './components/compliances/compliances.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewPolicyStatusComponent } from './components/view-policy-status/view-policy-status.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BranchComponent,
    DepartmentComponent,
    ApplicationMasterComponent,
    DesignationComponent,
    AppownerComponent,
    AppRoleMappingComponent,
    ItSupportMappingComponent,
    UserManagementComponent,
    RoleManagementComponent,
    MainDashboardComponent,
    ItAssetComponent,
    AssetComponent,
    ManagerDashboardComponent,
    ManagerLoginComponent,
    NgxSpinnerComponent,
    AssetMappingComponent,
    CompanypolicyComponent,
    CommonDriveComponent,
    UserDashboardComponent,
    MyprofileComponent,
    ItSupportDashboardComponent,
    BranchHierarchyComponent,
    AuppolicyComponent,
    ComplianceComponent,
    CompliancesComponent,
    PoliciesComponent,
    ViewPolicyStatusComponent    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AppRoutingModule,
    NgxSpinnerModule,
    PdfViewerModule,
    BsDatepickerModule.forRoot()
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCalIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
