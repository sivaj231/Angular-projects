import { AppConstants } from '../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BranchDto } from "./branchDto";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class itAssetService {

    constructor(private httpClient: HttpClient) {

    }

    public getAllEmpAssetDetails() {

        return this.httpClient.get(AppConstants.GET_ALL_IT_ASSET_DETAILS);

    }

    public save(req) {

        return this.httpClient.post(AppConstants.SAVE_IT_ASSET_DETAILS, req);

    }

    public getAssetDetailsById(req) {

        return this.httpClient.post(AppConstants.GET_ASSET_DETAILS_BY_ID, req);

    }

    public searchItAsset(req) {

        return this.httpClient.post(AppConstants.SEARCH_IT_ASSET, req);

    }

    public getAllITAsset() {

        return this.httpClient.get(AppConstants.GET_ALL_IT_ASSET).pipe(map((data: BranchDto[]) => {
            return data;
        }), catchError(error => {
            return throwError('Error');
        })
        )
    }

}