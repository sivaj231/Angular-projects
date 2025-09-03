import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) {

    }

    public saveUser(input) {

        return this.httpClient.post(AppConstants.SAVE_USER, input);

    }

    public searchUser(input) {

        return this.httpClient.post(AppConstants.SEARCH_USER, input);

    }

    public getAllUsers() {

        return this.httpClient.get(AppConstants.GET_ALL_USER);
    }


    public getCurrentEmployeeDetails() {

        return this.httpClient.post(AppConstants.GET_CURRENT_EMPLOYEE_DETAILS, '');
    }
    

}