import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private httpClient: HttpClient) {

    }

    public saveRole(input) {

        return this.httpClient.post(AppConstants.SAVE_ROLE, input);

    }
    public searchRole(req) {

        return this.httpClient.post(AppConstants.SEARCH_ROLE, req);

    }

    public getAllRole() {

        return this.httpClient.get(AppConstants.GET_ALL_ROLE);
    }

    public viewUserByRole(req) {

        return this.httpClient.post(AppConstants.GET_USERS_BY_ROLE, req);
    }

}