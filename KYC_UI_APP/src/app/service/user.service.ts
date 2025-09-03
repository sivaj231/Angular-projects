import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiUrlConstantService } from './api-url-constant.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrlConstantService
  ) { }

    getChannelAndBranchList(): Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_CHANNEL_BRANCH_LIST.toString()), httpOptions);
    }

    getUserMappedChannelAndBranchList(): Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_USER_MAPPED_CHANNEL_BRANCH_LIST.toString()),httpOptions);
    }

    saveUser(userDto): Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.SAVE_USER.toString()),userDto,httpOptions);
    }

    getModouleNames(roleName):Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_MODULE_NAMES.toString()+'?roleName='+roleName),httpOptions);
    }

    viewUser():Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.VIEW_USER.toString()),httpOptions);
    }

    getUserById(id):Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_USER_BY_ID.toString()+'?id='+id),httpOptions);
    }

    getTeleCallerBasedOnBranchAndChannel(channel, branch) : Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_TELECALLERS_BY_CHANNEL_LOCATION.toString()+'?channel='+channel+'&branch='+branch),httpOptions);
    }

    checkUserNameExistsOrNot(userName) : Observable<any> {
      return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.CHECK_USERNAME.toString()+'?userName='+userName),httpOptions);
    }



}
