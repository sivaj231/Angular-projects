import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/AppConstants";

@Injectable({
    providedIn:"root"
})
export class ViewPolicyStatusService {

    constructor(private httpClient : HttpClient){}

    public getAcceptUserList(){
        return this.httpClient.get(AppConstants.GET_ACCEPT_POLICY_STATUS);
    }

    public searchAcceptUserPolicy(req):Observable<any>{
        // alert(JSON.stringify(req));
        return this.httpClient.post(AppConstants.SEARCH_ACCEPT_USER_POLICY,req);
    }

}