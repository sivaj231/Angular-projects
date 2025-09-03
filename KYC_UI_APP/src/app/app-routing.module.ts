import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { UserComponent } from './layout/user/user.component';
import { RoleComponent } from './layout/role/role.component';
import { CreateUserComponent } from './layout/create-user/create-user.component';
import { CreateRoleComponent } from './layout/create-role/create-role.component';
import { MyTaskComponent } from './layout/my-task/my-task.component';
import { PolicyDetailsComponent } from './layout/policy-details/policy-details.component';
import { GlobalSearchComponent } from './layout/global-search/global-search.component';
import { ExceptionalTaskComponent } from './layout/exceptional-task/exceptional-task.component';
import { ViewExceptionalTaskComponent } from './layout/view-exceptional-task/view-exceptional-task.component';
import { UploadInvalidMobileComponent } from './layout/upload-invalid-mobile/upload-invalid-mobile.component';
import { UploadNcMobileComponent } from './layout/upload-nc-mobile/upload-nc-mobile.component';
import { ViewUploadDetailsComponent } from './layout/view-upload-details/view-upload-details.component';
import { DownloadInvalidMobileComponent } from './layout/download-invalid-mobile/download-invalid-mobile.component';
import { DownloadNcMobileComponent } from './layout/download-nc-mobile/download-nc-mobile.component';
import { ReAllocateComponent } from './layout/re-allocate/re-allocate.component';
import { TempAllocateComponent } from './layout/temp-allocate/temp-allocate.component';
import { config } from 'process';
import { PolicyDetailsMotorComponent } from './layout/policy-details-motor/policy-details-motor.component';



const routes: Routes = [
  {path : '', component:LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'user', component:UserComponent},
  {path : 'role', component:RoleComponent},
  {path : 'createUser', component:CreateUserComponent},
  {path : 'createRole', component:CreateRoleComponent},
  {path : 'myTask' , component:MyTaskComponent},
  {path : 'policyDetails/:taskId/:type', component:PolicyDetailsComponent},
  {path : 'taskSearch', component:GlobalSearchComponent},
  {path : 'exceptionalTask', component:ExceptionalTaskComponent},
  {path : 'viewExceptionalTask', component:ViewExceptionalTaskComponent},
  {path : 'uploadInvalidMobile',component:UploadInvalidMobileComponent},
  {path : 'uploadNcMobile',component:UploadNcMobileComponent},
  {path : 'viewUploads/:type',component:ViewUploadDetailsComponent},
  {path : 'downloadInvalidMobile',component:DownloadInvalidMobileComponent},
  {path : 'downloadNcMobile',component:DownloadNcMobileComponent},
  {path : 'reallocateTask',component:ReAllocateComponent},
  {path : 'tempAllocateTask',component:TempAllocateComponent},
  {path : 'policyDetailsMotor/:taskId/:type',component:PolicyDetailsMotorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
