import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BranchDto } from "./branchDto";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BranchService {

    constructor(private httpClient: HttpClient) {

    }

    public saveBranch(input) {

        return this.httpClient.post(AppConstants.SAVE_BRANCH, input);

    }
    public searchBranch(req) {

        return this.httpClient.post(AppConstants.SEARCH_BRANCH, req);

    }

    public getAllBranch() {

        return this.httpClient.get(AppConstants.GET_ALL_BRANCH).pipe(map((data: BranchDto[]) => {
            return data;
        }), catchError(error => {
            return throwError('Error');
        })
        )
    }

}