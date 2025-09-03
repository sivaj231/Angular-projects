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
export class AuthenticationService {

  loggedIn: Boolean = false;

  constructor(private http: HttpClient, private urlConstants: ApiUrlConstantService) { }

  setLoggedIn(loggedIn) {
    this.loggedIn = loggedIn;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  login(credentials): Observable<any> {
    return this.http.post(this.urlConstants.ROOT_URL.concat(this.urlConstants.LOGIN_URL.toString()), {
      userName: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
}
