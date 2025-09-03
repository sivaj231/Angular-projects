import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/AppConstants";

@Injectable({
    providedIn:'root'
})
export class CompliancesService{
    constructor(private httpClinet : HttpClient) {} 
    
    savePolicy(formData): Observable<any>{       
        return this.httpClinet.post(AppConstants.SAVE_COMPLIANCES, formData) ;
    }
    
    updatePolicy(formData): Observable<any>{       
        return this.httpClinet.post(AppConstants.SAVE_COMPLIANCES, formData) ;
    }

    public getAllCompliances(){
        return this.httpClinet.get(AppConstants.GET_ALL_COMPLIANCES);
    }

    public getComplinacesById(req){  

        return this.httpClinet.post(AppConstants.GET_COMPLIANCES_BY_ID,req);

    }

    public viewFile(req): Observable<any>{
        return this.httpClinet.post(AppConstants.GET_COMPLIANCES_VIEW_FILE,req);        
    }

    public searchCompliances(req){        
        return this.httpClinet.post(AppConstants.SEARCH_COMPLIANCES,req);
    }

}