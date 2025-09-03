import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ITSupportService {

    constructor(private httpClient: HttpClient) {

    }

    public saveItsupport(input) {

        return this.httpClient.post(AppConstants.SAVE_ITSUPPORT, input);

    }
    public searchITSupport(req) {

        return this.httpClient.post(AppConstants.SEARCH_IT_SUPPORT, req);

    }
    public getAllItsupport() {

        return this.httpClient.get(AppConstants.GET_ALL_ITSUPPORT);
    }

}