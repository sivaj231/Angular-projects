import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

username = "";
constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    localStorage.clear();
  }
  login() {
    localStorage.setItem("username", "admin");
    localStorage.setItem("password", "123");
    this.authService.isLoggedin = true;
    this.router.navigateByUrl("/approver-view")
  }


}
