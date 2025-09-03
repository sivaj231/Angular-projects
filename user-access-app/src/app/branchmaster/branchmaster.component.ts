import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branchmaster',
  templateUrl: './branchmaster.component.html',
  styleUrls: ['./branchmaster.component.css']
})
export class BranchmasterComponent implements OnInit {

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
