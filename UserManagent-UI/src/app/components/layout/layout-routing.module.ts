import { ManagerDashboardComponent } from './../manager/manager-dashboard/manager-dashboard.component';
import { MainDashboardComponent } from './../main-dashboard/main-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleManagementComponent } from './../masters/role-management/role-management.component';
import { UserManagementComponent } from './../masters/user-management/user-management.component';
import { ItSupportMappingComponent } from './../masters/it-support-mapping/it-support-mapping.component';
import { AppRoleMappingComponent } from './../masters/app-role-mapping/app-role-mapping.component';
import { AppownerComponent } from './../masters/appowner/appowner.component';
import { ApplicationMasterComponent } from './../masters/application-master/application-master.component';
import { DesignationComponent } from './../masters/designation/designation.component';
import { DepartmentComponent } from './../masters/department/department.component';
import { BranchComponent } from './../masters/branch/branch.component';
import { EmployeeComponent } from './employee/employee.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ItAssetComponent } from '../masters/it-asset/it-asset.component';
import { AssetComponent } from '../masters/asset/asset.component';
import { AssetMappingComponent } from '../masters/asset-mapping/asset-mapping.component';
import { CompanypolicyComponent } from '../companypolicy/companypolicy.component';
import { CommonDriveComponent } from '../masters/common-drive/common-drive.component';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';
import { MyprofileComponent } from '../myprofile/myprofile.component';
import { ItSupportDashboardComponent } from '../it-support-dashboard/it-support-dashboard.component';
import { BranchHierarchyComponent } from '../branch-hierarchy/branch-hierarchy.component';
import { AuppolicyComponent } from '../auppolicy/auppolicy.component';
import { ComplianceComponent } from '../compliance/compliance.component';
import { CompliancesComponent } from '../compliances/compliances.component';
import { PoliciesComponent } from '../policies/policies.component';
import { ViewPolicyStatusComponent } from '../view-policy-status/view-policy-status.component';



const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: MainDashboardComponent
            },
            {
                path: 'branch',
                component: BranchComponent
            },
            {
                path: 'emp',
                component: EmployeeComponent
            },
            {
                path: 'department',
                component: DepartmentComponent
            },
            {
                path: 'designation',
                component: DesignationComponent
            },
            {
                path: 'app-master',
                component: ApplicationMasterComponent
            },
            {
                path: 'app-owner',
                component: AppownerComponent
            },
            {
                path: 'app-role',
                component: AppRoleMappingComponent
            },
            {
                path: 'it-support',
                component: ItSupportMappingComponent
            },
            {
                path: 'user_mgmt',
                component: UserManagementComponent
            },
            {
                path: 'role_mgmt',
                component: RoleManagementComponent
            },
            {
                path: 'it_asset',
                component: ItAssetComponent
            },
            {
                path: 'asset-master',
                component: AssetComponent
            },
            {
                path: 'asset-mapping',
                component: AssetMappingComponent
            },
            {
                path: 'mg-dashboard',
                component: ManagerDashboardComponent
            },
            {
                path: 'user-dashboard',
                component: UserDashboardComponent
            },
            {
                path: 'companyPolicy',
                component: CompanypolicyComponent
            },
            {
                path: 'it-support-dashboard',
                component: ItSupportDashboardComponent
            },
            {
                path: 'common-drive',
                component: CommonDriveComponent
            },
            {
                path: 'my-profile',
                component: MyprofileComponent
            },
            {
                path: 'branch-hierarchy',
                component: BranchHierarchyComponent
            },
            {
                path: 'aupPolicy',
                component: AuppolicyComponent
            },
            {
                path: 'app-compliance',
                component: ComplianceComponent
            },
            {
                path:'compliance',
                component: CompliancesComponent
            },
            {
                path:'policies',
                component: PoliciesComponent
            },
            {
                path:'view-policy-status',
                component:ViewPolicyStatusComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
