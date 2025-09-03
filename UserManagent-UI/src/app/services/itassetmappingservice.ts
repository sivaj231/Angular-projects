import { AppConstants } from '../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class itAssetMappingService {

    constructor(private httpClient: HttpClient) {

    }

    public saveITAssetMap(input) {

        return this.httpClient.post(AppConstants.SAVE_IT_ASSET_MAP, input);

    }

    public getAllITAssetbyAssetType(req) {

        return this.httpClient.post(AppConstants.GET_ALL_ITASSET_BY_ASSETTYPE, req);

    }

    public getAssetDetailsByAssetId(req) {

        return this.httpClient.post(AppConstants.GET_ASSET_DETAILS_BY_ASSET_ID, req);

    }

    public getAllITAssetMap() {

        return this.httpClient.get(AppConstants.GET_ALL_IT_ASSET_MAP);
    }

}