import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { SharedService } from "../../service/shared.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  sharedData: any;
  sharedDataString: any = "";
  constructor(private _router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorageService,
    private sharedService: SharedService) {
    this.sharedData = {};
  }

  ngOnInit() {
    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if(data){
          this.isLoggedIn = true;
        }else{
          this.isLoggedIn = false;
        }  
      });
    }  
  }


}
