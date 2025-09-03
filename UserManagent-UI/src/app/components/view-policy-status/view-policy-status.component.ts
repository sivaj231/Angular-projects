import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplianceService } from 'src/app/services/compliance.service';
import { DataTableService } from 'src/app/services/dataTableService';
import { ViewPolicyStatusService } from 'src/app/services/viewPolicyStatus.service';

@Component({
  selector: 'app-view-policy-status',
  templateUrl: './view-policy-status.component.html',
  styleUrls: ['./view-policy-status.component.scss']
})
export class ViewPolicyStatusComponent implements OnInit {

  tableGrid : boolean = true;

  acceptUserPolicy : any =[];

  allPolicyType :any =[];

  viewFormFilter : FormGroup;

  policyFillter: FormGroup;

  constructor(private viewPolicyStatusService : ViewPolicyStatusService,
    private dataTableService : DataTableService,private fb : FormBuilder,private complianceService:ComplianceService) { 
    this.getAcceptUserList();
    this.getPolicyType();
   }

  ngOnInit(): void {

    this.viewFormFilter = this.fb.group({
      policyType : ['',[Validators.required]],
      startDate :['',[Validators.required]],
      dueDate:['',[Validators.required]],
      status:['',[Validators.required]]
    });

    this.policyFillter = this.fb.group({
      policyName : [null],
      startDate:[null],
      dueDate:[null],
      policyStatus:[null]
    });
  }

  showForm(){
    this.tableGrid = true;
  }

  getAcceptUserList(){
    this.dataTableService.dataTableDestory();
    this.viewPolicyStatusService.getAcceptUserList().subscribe((data:any) => {
        this.acceptUserPolicy = data.responseDto;
        this.dataTableService.dataTableReinitalize();
    });
  }

  getPolicyType(){
    this.complianceService.getAllComplinace().subscribe((data : any) =>{     
      this.allPolicyType= data.responseDto;
      //this.fillterPolicyType = data.responseDto;
    });
  }

  
  searchCompliances(){
   
    this.viewPolicyStatusService.searchAcceptUserPolicy(this.policyFillter.value).subscribe((data:any) => {
      this.dataTableService.dataTableDestory();
      this.acceptUserPolicy = data.responseDto;
      this.dataTableService.dataTableReinitalize();
    });
  }

  searchCompliancesReset(){
    this.policyFillter.reset();
    this.getAcceptUserList();
  }

}
