import { DepartmentComponent } from './components/masters/department/department.component';
import { BranchComponent } from './components/masters/branch/branch.component';
// import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { AuthGuard } from './security/AuthGuard';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'mg-login', component: ManagerLoginComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./components/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  {
    path: 'branch', component: BranchComponent
  },
  {
    path: 'department', component: DepartmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
