import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { number } from '@amcharts/amcharts4/core';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/AppConstants';
import { CompliancesService } from 'src/app/services/compliances.service';
import { DataTableService } from 'src/app/services/dataTableService';
import { PolicyService } from 'src/app/services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  myPdf;

  tableGrid : boolean = true;

  viewPolicy : boolean = false;

  nonEditView : boolean = false;

  isChecked: boolean;

  notAcceptList :any = [];

  acceptList = [];

  policyList : any = [];

  polciyDetails : any =[];

  policyCount : any =[];

  policyFormDetails : FormGroup;

  buttonEnable : boolean = true;

  expired : boolean = false;
  
  
  constructor( private fb : FormBuilder, 
    private compliancesService : CompliancesService,
    private policyService: PolicyService,
    private  dataTableService: DataTableService) {
    //this.getPolicyList();
    this. getNotAccept();
    this.getPolicyCount();
   }

   

  ngOnInit(): void {
    
      this.policyFormDetails = this.fb.group({
        policyIds  : [''],
        policyNames:[''],
        agreementStatus:['',[Validators.required]]
      });

  }

  save(policyForm){
    

    if(this.policyFormDetails.valid){
     
      const data = {
        'policyId' :policyForm.policyIds,
        'policyName' :policyForm.policyNames,
        'policyStatus':policyForm.agreementStatus 
      }
      this.policyService.savePolicyAccept(data).subscribe((data) => {
        if(data['status'] == AppConstants.SUCCESS){
          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {
              //this.getPolicyList();
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

  showGrid(){
    this.tableGrid=true;
    this.nonEditView = false;
    this.viewPolicy = false;
    this. getNotAccept();
    this.expired = false;
    this.isChecked =false;
  }

  getPolicyList(){
    this.compliancesService.getAllCompliances().subscribe((data : any) =>{
      this.policyList = data.responseDto;
    });
  }

  getNotAccept(){
    this.dataTableService.dataTableDestory();
    this.policyService.notAcceptPolicy().subscribe((data:any) =>{
      this.policyList = data.responseDto;
      this.acceptList = data.responseDto;
      this.dataTableService.dataTableReinitalize();
    });
  }


  getPolicyCount(){
    this.policyService.getPolicyCount().subscribe((data:any) => {
      this.policyCount =data.responseDto[0];
    });
  }


 

  policyDetail(input){
    let req = {policyId: input}
    this.isChecked;
    this.compliancesService.getComplinacesById(req).subscribe((data:any) => {
        this.polciyDetails = data.responseDto[0];    
        
        if(data.responseDto[0].activePolicyStatus === 'ACCEPTED'){
          this.buttonEnable=false;
          //alert(data.responseDto[0].activePolicyStatus);
        }else{
          this.buttonEnable = true;
        }
        if(data.responseDto[0].expired !== null){
          this.expired = true;
        }
        let byteCharacters = atob(this.polciyDetails.policyFile);
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
      let byteArray = new Uint8Array(byteNumbers);       
      let file = new Blob([byteArray], { type: 'application/pdf;base64' });
      //console.log(file);
      
      let fileURL = URL.createObjectURL(file);
      

      this.myPdf = fileURL;
        
        this.policyFormDetails.patchValue({
          policyIds  :this.polciyDetails.policyId,
          policyNames:this.polciyDetails.policyType
        });
        
           
    });
    this.viewPolicy = true;
    this.tableGrid = false;
    this.nonEditView = true;

  }

  get validate_form() { return this.policyFormDetails.controls; }
  
}
