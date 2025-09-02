import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
//import { ShareService } from '../service/share.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  username = "";
  newsCount = '';
  masterDataList: any = [];
  constructor(private router: Router, public authService: AuthService,) {

    // this.sharedService.currentNewsCount
    //   .subscribe(
    //     value => {
    //       this.newsCount = value;

    //     });
  }

  ngOnInit() {

    this.username = localStorage.getItem("username")
    if (this.username != "" && this.username != null && this.username != undefined) {

    } else {
      this.router.navigateByUrl("/login")
    }

  }
}
