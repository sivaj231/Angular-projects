import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    localStorage.clear();
  }

  login() {
    localStorage.setItem("username", "Shabeer");
    this.authService.isLoggedin = true;
    this.router.navigateByUrl("/dashboard")
  }

}
