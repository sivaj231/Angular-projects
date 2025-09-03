import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TokenStorageService } from './service/token-storage.service';
import { SharedService } from "./service/shared.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tele-Verification-UI';

  constructor(private router: Router, private sharedService: SharedService,
    private tokenStorageService: TokenStorageService, private _location: Location) { }


  ngOnInit() {
    console.log(" Location -> " + this._location.path());
    let token = this.tokenStorageService.getToken();
    let userData = this.tokenStorageService.getUser();


    if (token) {
      let jsonStringToken = this.tokenStorageService.getJwtDecodeData(this.tokenStorageService.getToken());
      //let jsonString = JSON.stringify(jsonStringToken);
      this.sharedService.nextSharedData(userData);
      this.router.navigateByUrl(this._location.path());
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
