import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicationmodulemaster',
  templateUrl: './applicationmodulemaster.component.html',
  styleUrls: ['./applicationmodulemaster.component.css']
})
export class ApplicationmodulemasterComponent implements OnInit {

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
