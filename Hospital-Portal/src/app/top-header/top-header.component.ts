import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
//import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {

  username = "";
  newsCount = '';
  logo: any
  showLogo: boolean = false
  constructor(private router: Router, public authService: AuthService,) {

    // this.sharedService.currentNewsCount
    //   .subscribe(
    //     value => {
    //       this.newsCount = value;

    //     });
    // this.sharedService.logo
    //   .subscribe(
    //     value => {
    //       if (value != null && value != undefined && value!='') {
    //         this.logo = value;
    //         this.showLogo = true
    //       }


    //     })
  }

  ngOnInit() {
    this.username = localStorage.getItem("username")
    if (this.username != "" && this.username != null && this.username != undefined) {

    } else {
      this.router.navigateByUrl("/login")
    }
  }

  logout() {
    this.authService.isLoggedin = false;
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
