import { Component, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-claim',
  templateUrl: './my-claim.component.html',
  styleUrls: ['./my-claim.component.css']
})
export class MyClaimComponent implements OnInit {
  files: any = [];

  uploadErfile(event,value) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteErAttachment(index) {
    this.files.splice(index, 1)
  }
  uploadBillfile(event,value) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteBillAttachment(index) {
    this.files.splice(index, 1)
  }
  public data = [
    {claimNo: 'CL00141', patientName: 'Ram', status:'Onhold',claimAmount:'$25000',approvedAmount:'$20000',dateOfAdmission:'13/01/2020',dateOfDischarge:'20/01/2020',proceedTime:'0.20 mins',awaiting:'-'},
    {claimNo: 'CL00132', patientName: 'Rahim', status:'Reject',claimAmount:'$50000',approvedAmount:'$30000',dateOfAdmission:'03/02/2020',dateOfDischarge:'20/02/2020',proceedTime:'0.10 mins',awaiting:'-'},
    {claimNo: 'CL00012', patientName: 'Dinesh', status:'Pending',claimAmount:'$30000',approvedAmount:'$30000',dateOfAdmission:'23/02/2020',dateOfDischarge:'05/03/2020',proceedTime:'0.15 mins',awaiting:'-'},
    {claimNo: 'CL00002', patientName: 'Shabeer Ahmed', status:'Success',claimAmount:'$120000',approvedAmount:'$10000',dateOfAdmission:'13/01/2020',dateOfDischarge:'25/01/2020',proceedTime:'0.05 mins',awaiting:'-'},
    {claimNo: 'CL00002', patientName: 'Shabeer Ahmed', status:'Success',claimAmount:'$120000',approvedAmount:'$10000',dateOfAdmission:'13/01/2020',dateOfDischarge:'25/01/2020',proceedTime:'0.05 mins',awaiting:'-'},
    
  ]
  public erData = [
    {erNo:'ER-21001',erDetails:'Please increase approved amount',erStatus:'Submitted',},
    {erNo:'ER-21022',erDetails:'Please increase approved amount',erStatus:'Pending',},    
    {erNo:'ER-21045',erDetails:'Please increase approved amount',erStatus:'Approved',},
    {erNo:'ER-21004',erDetails:'Please increase approved amount',erStatus:'Submitted',},
  ]
  public billsData = [
    {claimNo: 'CL00141', patientName: 'Ram',billType:'Interim Bill',comments:'Enter your Comments'},
    {claimNo: 'CL00124', patientName: 'Shabeer',billType:'Final Bill',comments:'Enter your Comments'},
    {claimNo: 'CL00115', patientName: 'Dinesh',billType:'Interim Bill',comments:'Enter your Comments'},
    {claimNo: 'CL00175', patientName: 'Prabhu',billType:'Final Bill',comments:'Enter your Comments'},
  ]
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
