import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/AppConstants';
import { ComplianceService } from 'src/app/services/compliance.service';
import { ComplianceDto } from 'src/app/services/ComplianceDto';
import { DataTableService } from 'src/app/services/dataTableService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss']
})
export class ComplianceComponent implements OnInit {

  form : boolean = false;

  tableGrid: boolean = true;

  readOnly:boolean =false;

  complianceList : ComplianceDto[];

  complianceDetails:any =[];

  parentcomplianceDetails:any =[];

  addEditComplianceView : boolean = false;

  viewCompliance : boolean = false;

  nonEditView:boolean = false;

  complainceFormFilter: FormGroup;

  complianceFormDetails : FormGroup;

  complianceSearchForm : FormGroup;

  formData:FormData = new FormData();

  constructor(private fb:FormBuilder, private complianceService : ComplianceService,private  dataTableService: DataTableService) { 
    this.getAllCompliance();
  }

  ngOnInit(): void {

    this.complianceSearchForm = this.fb.group({
      policyType:[null],
      status:[null]
    });

    this.complianceFormDetails = this.fb.group({
      policyId : new FormControl('',[Validators.required]),
      policyType : new FormControl('',[Validators.required]),
      status :new FormControl(''),
      action: [AppConstants.NEW, Validators.required]
    }); 

  }

  showForm(){
    this.form = true;
    this.tableGrid = false;
    this.addEditComplianceView = true;
    this.complianceFormDetails.reset();
    this.viewCompliance = true;
    this.nonEditView = false;
    this.complianceFormDetails.patchValue({action : AppConstants.NEW});
    this.readOnly=false;
  }

  showGrid(){
    this.addEditComplianceView = false;
    this.tableGrid = true;
    this.getAllCompliance();
    this.form=false;
    this.viewCompliance = false;
    this.nonEditView = false;
  }

  save(complianceForm){


    this.formData = new FormData();
    this.formData.append('policyId',this.complianceFormDetails.get('policyId').value);
    this.formData.append('policyType',this.complianceFormDetails.get('policyType').value);
    
    let data ={
      'policyId':this.complianceFormDetails.get('policyId').value,
      'policyType':this.complianceFormDetails.get('policyType').value,
    }
      
    let res : boolean = complianceForm;
    if(res){
      this.complianceService.saveComplinace(this.complianceFormDetails.value).subscribe((data) => {
        if(data['status'] == AppConstants.SUCCESS){
          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {
              //this.getAllCompliance();
              this.showGrid();

            } else if (result.isDenied) {

            }
          })
          
        }else{
          Swal.fire({
            icon: 'error',
            title: '',
            text: data['exceptionMsg'],
          })
          
        }
      });
    }
  }

  getAllCompliance(){
    
    this.dataTableService.dataTableDestory();

    this.complianceService.getAllComplinace().subscribe((data : any) =>{
     
      this.complianceList= data.responseDto;

      this.parentcomplianceDetails = data.responseDto;

      this.dataTableService.dataTableReinitalize();
    });
  }

  viewComplianceDetailsById(input){
    let req = { policyId: input }
    this.complianceService.getComplinaceById(req).subscribe((data : any) =>{
     this.complianceDetails = data.responseDto[0];
    });

    this.tableGrid=false;

    this.viewCompliance=true;

    this.nonEditView=true;

    this.addEditComplianceView=false;

  }

  editCompliance(input){
    this.showForm();
    this.complianceFormDetails.patchValue({
      policyId : input.policyId,
      policyType : input.policyType,
      action : AppConstants.EDIT,
      status :input.status
    });
  }

  searchCompliance(){
    this.dataTableService.dataTableDestory();

    if(this.complianceSearchForm.get('policyType').value != null ||  this.complianceSearchForm.get('status').value != null)
    {
      this.complianceService.searchCompliance(this.complianceSearchForm.value).subscribe((data : any) => {
      
        this.complianceList = data.responseDto;
  
        this.dataTableService.dataTableReinitalize();
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: '',
        text: "Please Select Minimum One Option.",
      })
    }

   

  }

  searchComplianceReset() {

    this.complianceSearchForm.reset();

    this.getAllCompliance();

  }

  get validate_form() { return this.complianceFormDetails.controls; }
}
