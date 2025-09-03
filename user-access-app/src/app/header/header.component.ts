import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username="";
  constructor(private router:Router,public authService: AuthService) { }
  //constructor(){}
  ngOnInit(): void {
    this.username= localStorage.getItem("username")
    if(this.username!="" && this.username!=null && this.username!=undefined){
 
    }else{
     this.router.navigateByUrl("/login")
    }
  }
  logout(){
    this.authService.isLoggedin=false;
    this.router.navigateByUrl('/login');
   
  }
}
