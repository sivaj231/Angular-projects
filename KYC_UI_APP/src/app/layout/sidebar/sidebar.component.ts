import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { SharedService } from "../../service/shared.service";
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  objectKeys = Object.keys;
  form: any = {};
  isLoggedIn: Boolean = false;
  roles: string[] = [];
  sharedData: any;
  moduleData: any;

  constructor(private _router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorageService,
    private sharedService: SharedService) {
    this.sharedData = {};
  }
  ngOnInit() {
    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if(data){
          this.isLoggedIn = true;
          this.moduleData = data.moduleDetails;
          this.sideBarJquery();
        }else{
          this.isLoggedIn = false;
        }  
      });
    }

  }
  sideBarJquery() {

    jQuery(function ($) {

      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      $("#close-sidebar").click(function () {
        $(".container-scroller").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".container-scroller").addClass("toggled");
      });
    });
  }
}
