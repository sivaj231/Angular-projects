import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor() { }
  private contentEditable: boolean = false;
  contentEdit(){
    this.contentEditable = true;
  }
  cancelEdit(){
    this.contentEditable = false;
  }
  ngOnInit() {
  }

}
