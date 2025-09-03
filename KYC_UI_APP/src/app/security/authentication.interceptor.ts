import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { TokenStorageService } from '../service/token-storage.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';  

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private token : TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.token.getToken();

    if (token != null) {
      // for Spring Boot back-end
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }

    return next.handle(authReq).pipe(tap((response) => {
      if (response instanceof HttpResponse) {

       // this.spinner.hide();

      }
    }, (errorData) => {
      if (errorData instanceof HttpErrorResponse) {

        //this.spinner.hide();

      }
    }));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];
