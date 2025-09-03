import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/AppConstants";


@Injectable({
    providedIn:'root'
})


export class ComplianceService {

    

    constructor(private httpClient: HttpClient){}

    public saveComplinace(formData) :Observable<any> {
       
        return this.httpClient.post(AppConstants.SAVE_COMPLIANCE,formData);
        
    }

    public getAllComplinace(){

        return this.httpClient.get(AppConstants.GET_ALL_COMPLIANCE);

    }

    public getAllComplinaceTypeActive(){

        return this.httpClient.get(AppConstants.GET_ALL_COMPLIANCE_TYPE_ACTIVE);

    }
    public getComplinaceById(req){  

        return this.httpClient.post(AppConstants.GET_COMPLIANCE_BY_ID,req);

    }

    public searchCompliance(req){        
        return this.httpClient.post(AppConstants.SEARCH_COMPLIANCE,req);
    }
}