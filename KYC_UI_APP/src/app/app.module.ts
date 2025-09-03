import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule, DatePipe,HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CreateButtonComponent } from './layout/create-button/create-button.component';
import { CreateRoleComponent } from './layout/create-role/create-role.component';
import { CreateUserComponent } from './layout/create-user/create-user.component';
import { MyTaskComponent } from './layout/my-task/my-task.component';
import { RoleComponent } from './layout/role/role.component';
import { UserComponent } from './layout/user/user.component';
import { HomeComponent } from './layout/home/home.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SplitPipe } from './helper/split.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { authInterceptorProviders } from './security/authentication.interceptor';
import { PolicyDetailsComponent } from './layout/policy-details/policy-details.component';
import { GlobalSearchComponent } from './layout/global-search/global-search.component';
import { SearchPolicyDetailsComponent } from './layout/search-policy-details/search-policy-details.component';
import { TcUpdateComponent } from './layout/tc-update/tc-update.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReminderComponent } from './layout/reminder/reminder.component';
import { ExceptionalTaskComponent } from './layout/exceptional-task/exceptional-task.component';
//import { SendOtpComponent } from './layout/send-otp/send-otp.component';
import { ViewExceptionalTaskComponent } from './layout/view-exceptional-task/view-exceptional-task.component';
import { UploadInvalidMobileComponent } from './layout/upload-invalid-mobile/upload-invalid-mobile.component';
import { UploadNcMobileComponent } from './layout/upload-nc-mobile/upload-nc-mobile.component';
import { DownloadInvalidMobileComponent } from './layout/download-invalid-mobile/download-invalid-mobile.component';
import { DownloadNcMobileComponent } from './layout/download-nc-mobile/download-nc-mobile.component';
import { ViewUploadDetailsComponent } from './layout/view-upload-details/view-upload-details.component';
import { ReAllocateComponent } from './layout/re-allocate/re-allocate.component';
import { TempAllocateComponent } from './layout/temp-allocate/temp-allocate.component';
import { MaskPipe } from './helper/mask.pipe';
import { PolicyDetailsMotorComponent } from './layout/policy-details-motor/policy-details-motor.component';
import { TickSvgComponent } from './layout/tick-svg/tick-svg.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CreateButtonComponent,
    CreateRoleComponent,
    CreateUserComponent,
    MyTaskComponent,
    RoleComponent,
    UserComponent,
    HomeComponent,
    SplitPipe,
    PolicyDetailsComponent,
    GlobalSearchComponent,
    SearchPolicyDetailsComponent,
    TcUpdateComponent,
    ReminderComponent,
    ExceptionalTaskComponent,
    //SendOtpComponent,
    ViewExceptionalTaskComponent,
    UploadInvalidMobileComponent,
    UploadNcMobileComponent,
    DownloadInvalidMobileComponent,
    DownloadNcMobileComponent,
    ViewUploadDetailsComponent,
    ReAllocateComponent,
    TempAllocateComponent,
    MaskPipe,
    PolicyDetailsMotorComponent,
    TickSvgComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTablesModule,
    FormsModule, 
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [DatePipe,authInterceptorProviders,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
