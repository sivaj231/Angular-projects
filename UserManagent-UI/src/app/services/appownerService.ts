import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppOwnerService {
    constructor(private httpClient: HttpClient) {

    }

    public saveAppOwner(input) {

        return this.httpClient.post(AppConstants.SAVE_APP_OWNER, input);

    }
    public searchAppOwner(req) {

        return this.httpClient.post(AppConstants.SEARCH_APP_OWNER, req);

    }
    public getAllAppOwner() {

        return this.httpClient.get(AppConstants.GET_ALL_APPOWNER);
    }

}