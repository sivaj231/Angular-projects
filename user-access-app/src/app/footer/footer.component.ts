import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  username="";
  constructor(private router:Router, public authService: AuthService) { }
 //constructor(){}
  ngOnInit() {
   this.username= localStorage.getItem("username")
   if(this.username!="" && this.username!=null && this.username!=undefined){
  
   }else{
    this.router.navigateByUrl("/login")
   }
  }
}
