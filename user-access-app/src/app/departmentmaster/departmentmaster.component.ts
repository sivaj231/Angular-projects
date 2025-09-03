import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departmentmaster',
  templateUrl: './departmentmaster.component.html',
  styleUrls: ['./departmentmaster.component.css']
})
export class DepartmentmasterComponent implements OnInit {

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
