import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppRoleMappingService {

    constructor(private httpClient: HttpClient) {

    }

    public saveAppRoleMapping(input) {

        return this.httpClient.post(AppConstants.SAVE_APP_ROLE_MAPPING, input);

    }
    public findExist(input) {

        return this.httpClient.post(AppConstants.FIND_EXIST_APP_ROLE_MAPPING, input);

    }
    public searchAppRole(req) {

        return this.httpClient.post(AppConstants.SEARCH_APP_ROLE, req);

    }
    public getMappedApplicationList() {

        return this.httpClient.get(AppConstants.GET_MAPPED_APPLICATION_LIST);

    }

    public getRoleByApplication(req) {

        return this.httpClient.post(AppConstants.GET_APPCODE_AND_ROLE_CODE, req);

    }

    public getApplicationGroupBy() {

        return this.httpClient.get(AppConstants.GET_APPLICATION_GROUP_BY);

    }

}