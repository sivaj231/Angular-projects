import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DesignationService {

    constructor(private httpClient: HttpClient) {

    }

    public saveDesignation(input) {

        return this.httpClient.post(AppConstants.SAVE_DESIGNATION, input);

    }
    public searchDesignation(req) {

        return this.httpClient.post(AppConstants.SEARCH_DESIGNATION, req);

    }
    public getAllDesignation() {

        return this.httpClient.get(AppConstants.GET_ALL_DESIGNATION);
    }

    public getAllEmployee() {

        return this.httpClient.get(AppConstants.GET_ALL_EMPLOYEE);
    }

}