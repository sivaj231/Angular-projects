import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/AppConstants";

@Injectable({
    providedIn:'root'
})
export class PolicyService{

    
    constructor(private httpClient : HttpClient){}
    savePolicyAccept(data):Observable<any>{
       
        return this.httpClient.post(AppConstants.SAVE_ACCEPT_POLICY, data) ;
    }

    notAcceptPolicy(){
        return this.httpClient.get(AppConstants.GET_NOT_ACCEPT_POLICY);
    }

   getPolicyCount(){
       return this.httpClient.get(AppConstants.GET_NOT_ACCEPT_POLICY_COUNT);
   }

   getPolicyPushCount(){
    return this.httpClient.get(AppConstants.GET_NOT_ACCEPT_POLICY_COUNT);
}
}