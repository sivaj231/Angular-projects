import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApplicationDataMaintanceService {

    constructor(private httpClient: HttpClient) {

    }


    saveAppDataMaitenance() {

        return this.httpClient.get(AppConstants.SAVE_APP_DATA_MAITENANCE);

    }

    getApplicationDataCurrnetQuarter(req) {

        return this.httpClient.post(AppConstants.GET_APPLICATION_DATA_CURRENT_QUARTER, req);

    }


}