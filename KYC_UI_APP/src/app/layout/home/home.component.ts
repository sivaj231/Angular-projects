import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { SharedService } from "../../service/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  
  }
}