import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ApplicationmasterComponent } from './applicationmaster/applicationmaster.component';
import { FunctionalheadComponent } from './functionalhead/functionalhead.component';
import { CreateformComponent } from './createform/createform.component';
import { ApproverComponent } from './approver/approver.component';
import { BranchmasterComponent } from './branchmaster/branchmaster.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { SearchComponent } from './search/search.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { UploadComponent } from './upload/upload.component';
import { UserComponent } from './user/user.component';
import { ApplicationmodulemasterComponent } from './applicationmodulemaster/applicationmodulemaster.component';
import { ItApproverComponent } from './it-approver/it-approver.component';
import { ApproverViewComponent } from './approver-view/approver-view.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component:RegistrationComponent },
  {path:'applicationmaster', component:ApplicationmasterComponent},
  {path:'applicationmodulemaster' ,component:ApplicationmodulemasterComponent},
  {path:'functionalhead', component:FunctionalheadComponent},
  {path:'createform', component:CreateformComponent},
  {path:'approver', component:ApproverComponent},
  {path:'branchmaster', component:BranchmasterComponent},
  {path:'manageuser', component:ManageuserComponent},
  {path:'search',component:SearchComponent},
  {path:'departmentmaster',component:DepartmentmasterComponent},
  {path:'upload' ,component:UploadComponent},
  {path:'branchmaster' ,component:BranchmasterComponent},
  {path:'user' ,component:UserComponent},
  {path:'it-approver' ,component:ItApproverComponent},
  {path:'approver-view' ,component:ApproverViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
