import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
//import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  username = "";
  masterDataList: any[] = []
  constructor(private router: Router, public authService: AuthService,) {

    // this.sharedService.currentHeadLine
    //   .subscribe(
    //     value => {
    //       if (value === 'true')
    //         this.getAllNewsCreation();
    //     })
  }


  ngOnInit() {
    this.username = localStorage.getItem("username")
    if (this.username != "" && this.username != null && this.username != undefined) {

    } else {
      this.router.navigateByUrl("/login")
    }
  }
  
  // getAllNewsCreation() {
  //   this.authService.getAllNewsCreation().subscribe(Response => {
  //     this.masterDataList = [];
  //     this.masterDataList = Response.responseData;
  //   });
  // }
}
