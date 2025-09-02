import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {

  constructor() { }
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

  public erData = [
    {erNo:'ER-21001',erDetails:'Please increase approved amount',erStatus:'Submitted',},
    {erNo:'ER-21022',erDetails:'Please increase approved amount',erStatus:'Pending',},    
    {erNo:'ER-21045',erDetails:'Please increase approved amount',erStatus:'Approved',},
    {erNo:'ER-21004',erDetails:'Please increase approved amount',erStatus:'Submitted',},
  ]
  public billsData = [
    {claimNo: 'CL00141', patientName: 'Ram',billType:'Interim Bill',comments:'Please increase approved amount'},
    {claimNo: 'CL00124', patientName: 'Shabeer',billType:'Final Bill',comments:'Please increase approved amount'},
    {claimNo: 'CL00115', patientName: 'Dinesh',billType:'Interim Bill',comments:'Please increase approved amount'},
    {claimNo: 'CL00175', patientName: 'Prabhu',billType:'Final Bill',comments:'Please increase approved amount'},
  ]
  ngOnInit() {
  }
  display = "none";
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}
