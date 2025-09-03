import { AppConstants } from '../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class assetMaster {

    constructor(private httpClient: HttpClient) {

    }

    public saveAsset(input) {

        return this.httpClient.post(AppConstants.SAVE_ASSET_MASTER, input);

    }

    public getAllAsset() {

        return this.httpClient.get(AppConstants.GET_ALL_ASSET_MASTER);
    }

    public searchAsset(input){

        return this.httpClient.post(AppConstants.GET_SEARCH_ASSET_MASTER, input);

    }

}