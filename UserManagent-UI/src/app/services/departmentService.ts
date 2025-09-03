import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BranchDto } from "./branchDto";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private httpClient: HttpClient) {

    }
    public saveDepartment(input) {

        return this.httpClient.post(AppConstants.SAVE_DEPARTMENT, input);

    }
    public getAllDepartment() {

        return this.httpClient.get(AppConstants.GET_ALL_DEPARTMENT);

    }
    public searchDepartment(req) {

        return this.httpClient.post(AppConstants.SEARCH_DEPARTMENT, req);

    }

}