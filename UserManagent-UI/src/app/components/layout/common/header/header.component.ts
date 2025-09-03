import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() count: number;
  
  loginDetails: any = {};

  policyCount : any =[];

  constructor(private router: Router, private loginService: LoginService,private policyService:PolicyService) {
    this.getPolicyCount();
   }

  ngOnInit(): void {

    this.loginDetails['userName'] = localStorage.getItem('userName');

    this.loginDetails['userId'] = localStorage.getItem('userId');

    this.loginDetails['roleName'] = localStorage.getItem('roleName');
  }

  logout() {

    // this.loginService.logout().subscribe();

    localStorage.clear();
    this.router.navigateByUrl('/login');

  }

  getPolicyCount(){
    this.policyService.getPolicyCount().subscribe((data:any) => {
      this.policyCount =data.responseDto[0];
    });
  }

}
