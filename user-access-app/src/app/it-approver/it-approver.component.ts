import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-it-approver',
  templateUrl: './it-approver.component.html',
  styleUrls: ['./it-approver.component.css']
})
export class ItApproverComponent implements OnInit {
  radioSelected:any;
  show=false;
  newUser(e){
    this.show= e.target.checked;
  }
  hideUser(){
    this.show=false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
