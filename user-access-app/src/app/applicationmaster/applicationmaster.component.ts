import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicationmaster',
  templateUrl: './applicationmaster.component.html',
  styleUrls: ['./applicationmaster.component.css']
})
export class ApplicationmasterComponent implements OnInit {

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
