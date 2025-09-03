import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AppMasterService {
    
    constructor(private httpClient: HttpClient) {

    }

    public saveAppMaster(input) {

        return this.httpClient.post(AppConstants.SAVE_APPLICATION_DETAILS, input);

    }
    public searchAppMaster(req) {

        return this.httpClient.post(AppConstants.SEARCH_APP_MASTER, req);

    }
    public getallApplication() {

        return this.httpClient.get(AppConstants.GET_ALL_APPLICATION);
    }
    public getAllApplicationandEmployee() {

        return this.httpClient.get(AppConstants.GET_ALL_APPLICATION_AND_EMPLOYEE);
    }

    public getAllApplication() {

        return this.httpClient.get(AppConstants.GET_ALL_APPLICATION);
    }

    public getAllEmployee() {

        return this.httpClient.get(AppConstants.GET_ALL_EMPLOYEE);
    }

    

}