import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AppApproveService {

    constructor(private httpClient: HttpClient) {

    }

    approveApp(req) {

        return this.httpClient.post(AppConstants.UPDATE_APP_DATA_MAINTENANCE, req);

    }

}