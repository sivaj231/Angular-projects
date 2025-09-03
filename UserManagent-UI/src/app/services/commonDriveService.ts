import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonDriveService {

    constructor(private httpClient: HttpClient) {

    }


    saveCommonDrive(req) {

        return this.httpClient.post(AppConstants.SAVE_COMMON_DRIVE, req);

    }

    getAllCommonDrive() {

        return this.httpClient.post(AppConstants.GET_ALL_COMMON_DRIVE, '');

    }

    mapDriveToEmp(req) {

        return this.httpClient.post(AppConstants.MAP_DRIVE_TO_EMP, req);

    }

    getCommonDriveMappingDetails(req) {

        return this.httpClient.post(AppConstants.GET_COMMON_DRIVE_MAPPING_DETAILS, req);

    }

    getAllEmp() {

        return this.httpClient.get(AppConstants.GET_ALL_EMP);

    }

    public getCommonDriveDetailsByPath(req){
        
        return this.httpClient.get(AppConstants.GET_COMMONDRIVE_PATH+'?path='+req);
    }

}