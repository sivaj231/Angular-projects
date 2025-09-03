import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedin:Boolean=false;
  constructor(private http: HttpClient) { }
  // login(input): Observable<AuthResponse> {  
  //   const headers = {
  //     "Content-type": "application/json"
  //   };
  //   return this.http.post<AuthResponse>(
  //     `http://localhost:9292/UserAccessForm/token/generate-token`,
  //     input,
  //     { headers }
  //   ); 
}
