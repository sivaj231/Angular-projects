import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "../constants/AppConstants";
import { AupPolicyDto } from "./aup_policy_dto";


@Injectable({
    providedIn:"root"
})

export class AupPolicyService{

    constructor(private httpClinet : HttpClient) {} 
    savePolicy(formData): Observable<any>{       
        return this.httpClinet.post(AppConstants.SAVE_AUP_POLICY, formData) ;
    }

}