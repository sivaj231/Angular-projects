import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public paymentData = [
    {claimId:'CL00002',healthcardNo:'140221',claimNo: 'CL00141',patientName: 'Ram',utrNo:'002141',claimedAmount:'12010',approvedAmount:'11420',status:'Pending', },
    {claimId:'CL11025',healthcardNo:'140234',claimNo: 'CL02011',patientName: 'Dinesh',utrNo:'002145',claimedAmount:'15600',approvedAmount:'15500',status:'Approved', },
    {claimId:'CL11045',healthcardNo:'120215',claimNo: 'CL02165',patientName: 'Prabhu',utrNo:'001547',claimedAmount:'23200',approvedAmount:'23200',status:'Reject', },
    {claimId:'CL12302',healthcardNo:'210334',claimNo: 'CL01420',patientName: 'Shabeer Ahmed',utrNo:'002141',claimedAmount:'50220',approvedAmount:'50000',status:'Onhold', },
    
    
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
}
