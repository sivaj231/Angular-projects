import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queries-response',
  templateUrl: './queries-response.component.html',
  styleUrls: ['./queries-response.component.css']
})
export class QueriesResponseComponent implements OnInit {
  public data = [
    {claimNo: 'CL00141', patientName: 'Ram', status:'Query',claimAmount:'$25000',approvedAmount:'$20000',query:'Please Attach Your Health Card'},
    {claimNo: 'CL00132', patientName: 'Rahim', status:'Query',claimAmount:'$50000',approvedAmount:'$30000',query:'Please Attach Your Health Card'},
    {claimNo: 'CL00012', patientName: 'Dinesh', status:'Query',claimAmount:'$30000',approvedAmount:'$30000',query:'Please Attach Your Health Card'},
    
  ];
 
  constructor() { } 
 
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }
  display = "none";
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
