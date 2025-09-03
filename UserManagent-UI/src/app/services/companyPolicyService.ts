import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CompanyPolicyService {

    constructor(private httpClient: HttpClient) {

    }


    saveCompanyPolicy(req) {

        return this.httpClient.post(AppConstants.SAVE_COMPANY_POLICY, req);

    }

    getCompanyPolicy() {

        return this.httpClient.post(AppConstants.GET_COMPANY_POLICY, '');

    }

    policyAcceptence() {

        return this.httpClient.post(AppConstants.POLICY_ACCEPTENCE, '');

    }


}