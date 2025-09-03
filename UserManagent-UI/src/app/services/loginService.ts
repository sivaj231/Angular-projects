import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient) {

    }


    login(req) {

        return this.httpClient.post(AppConstants.AUTHENTICATE, req);

    }


    logout() {

        return this.httpClient.post(AppConstants.LOGOUT, '');

    }

}