import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public data = [
    {claimNo: 'CL00141', patientName: 'Ram', status:'Onhold',claimAmount:'$25000',approvedAmount:'$20000',dateOfAdmission:'13/01/2020',dateOfDischarge:'20/01/2020',proceedTime:'0.20 mins',awaiting:'-'},
    {claimNo: 'CL00132', patientName: 'Rahim', status:'Reject',claimAmount:'$50000',approvedAmount:'$30000',dateOfAdmission:'03/02/2020',dateOfDischarge:'20/02/2020',proceedTime:'0.10 mins',awaiting:'-'},
    {claimNo: 'CL00012', patientName: 'Dinesh', status:'Pending',claimAmount:'$30000',approvedAmount:'$30000',dateOfAdmission:'23/02/2020',dateOfDischarge:'05/03/2020',proceedTime:'0.15 mins',awaiting:'-'},
    {claimNo: 'CL00002', patientName: 'Shabeer Ahmed', status:'Success',claimAmount:'$120000',approvedAmount:'$10000',dateOfAdmission:'13/01/2020',dateOfDischarge:'25/01/2020',proceedTime:'0.05 mins',awaiting:'-'},    
    
  ]
  constructor() { }

  ngOnInit() {
  }

}
