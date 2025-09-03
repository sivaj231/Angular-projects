import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { SharedService } from "../../service/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userName : string = '';
  roles: string[] = [];
  sharedData: any;
  constructor(public _router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorageService,
    private sharedService: SharedService) {
    this.sharedData = {};
  }

  ngOnInit() {
    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if(data){
          console.log(data);
          this.isLoggedIn = true;
          this.userName= data.userDetails.Username;
          this.roles = data.userDetails.userRoles[0];
        }else{
          this.isLoggedIn = false; 
        }  
      });
    }   
  }

//  {"moduleDetails":{"Task":["My Task-/myTask-task"],"Admin":["Role-/role-role","User-/user-user"]},"userDetails":{"Username":"admin","loginId":"1","authToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6WyJST0xFX0FETUlOIl0sIlVzZXJDb250ZXh0Ijp7IlVzZXJuYW1lIjoiYWRtaW4iLCJsb2dpbklkIjoiMSIsImF1dGhUb2tlbiI6bnVsbCwidXNlclJvbGVzIjpbIlJPTEVfQURNSU4iXX0sImlzcyI6IlJTQUlOU1VSQU5DRSIsImlhdCI6MTU5NTg0NzA0OSwiZXhwIjoxNTk1ODQ4ODQ5fQ.HgAXnPndOXT_yiWCtZMx1ZpqzbHVo8nRWAR9Hy43PJekYtF-vvCXj-92Nu6ide9JVMIstqxZ822mATi2MPqYkg","userRoles":["ROLE_ADMIN"]}}


  logOut(){
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.sharedService.nextSharedData(null);
    this._router.navigateByUrl("/");
  }

}
