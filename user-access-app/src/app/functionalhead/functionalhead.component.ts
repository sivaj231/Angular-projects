import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functionalhead',
  templateUrl: './functionalhead.component.html',
  styleUrls: ['./functionalhead.component.css']
})
export class FunctionalheadComponent implements OnInit {

  constructor() { }

  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }
}
