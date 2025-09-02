import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
username="";
  constructor(private router:Router) { }

  ngOnInit() {
   this.username= localStorage.getItem("username")
   if(this.username!="" && this.username!=null && this.username!=undefined){

   }else{
    this.router.navigateByUrl("/login")
   }
  }

}
