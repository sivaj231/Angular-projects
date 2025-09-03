import { AppConstants } from '../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BranchDto } from "./branchDto";
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private httpClient: HttpClient) {

    }

    public saveEmployee(branchDto: BranchDto) {

        return this.httpClient.post(AppConstants.SAVE_EMPLOYEE, branchDto);

    }

    public getEmpById(req) {

        return this.httpClient.post(AppConstants.GET_EMP_BY_ID, req);

    }

    public searchEmployee(req) {

        return this.httpClient.post(AppConstants.SEARCH_EMPLOYEE, req);

    }

    public getAllEmployee() {

        return this.httpClient.get(AppConstants.GET_ALL_EMPLOYEE);

    }

    public getRecentlyAddedEmployeeList() {

        return this.httpClient.get(AppConstants.GET_RECENT_EMPLOYEE_DETAILS);

    }


    public getDepartmentCountChart() {

        return this.httpClient.get(AppConstants.GET_DEPARTMENT_COUNT_CHART);

    }

    public getDashboardCount() {

        return this.httpClient.get(AppConstants.GET_DASHBOARD_COUNT);

    }


    public getAllEmployeeByReportingHead() {

        return this.httpClient.get(AppConstants.GET_ALL_EMPLOYEE_BY_REPORTING_HEAD);

    }

    public getManagerDashBoardCount() {

        return this.httpClient.get(AppConstants.GET_MANAGER_DASHBOARD_COUNT);

    }

    public mapEmpApplicationAndRoles(req) {

        return this.httpClient.post(AppConstants.MAP_EMP_APPLICATION_AND_ROLES, req);

    }

}