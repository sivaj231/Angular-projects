import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulemaster',
  templateUrl: './modulemaster.component.html',
  styleUrls: ['./modulemaster.component.css']
})
export class ModulemasterComponent implements OnInit {

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
