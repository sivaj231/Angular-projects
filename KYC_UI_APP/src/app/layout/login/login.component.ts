import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { SharedService } from "../../service/shared.service";
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private _router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorageService, private sharedService: SharedService,
    private ngxSpinner : NgxSpinnerService) { }

  ngOnInit() {
    localStorage.clear();
    window.sessionStorage.clear();
    this.sharedService.nextSharedData(null);
    this.authService.setLoggedIn(false);
  }

  onSubmit() {
    this.ngxSpinner.show();
    this.authService.login(this.form).subscribe(
      data => {
        this.ngxSpinner.hide();
        let token = data.userDetails.authToken;
        if (token) {
          //let jwtDecodeData = this.tokenStorage.getJwtDecodeData(token);
          this.tokenStorage.saveToken(token);
          //this.tokenStorage.saveUser(data.userDetails);
          this.tokenStorage.saveUser(data);
          this.authService.setLoggedIn(true);
          
          //let jsonString = JSON.stringify(jwtDecodeData);
          this.sharedService.nextSharedData(data);
          this._router.navigateByUrl("/home");
        } else {
          this.isLoginFailed = true;
        }      
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.ngxSpinner.hide();
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
