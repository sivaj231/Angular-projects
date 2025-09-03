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
export class RoleService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrlConstantService
  ) { }


  saveUser(roleDto): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.SAVE_ROLE.toString()),roleDto,httpOptions);
  }

  viewRole() : Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.VIEW_ROLE.toString()),httpOptions);
  }

  viewRoleById(id) : Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.VIEW_ROLE_BY_ID.toString()+'?id='+id),httpOptions);
  }
  
}
