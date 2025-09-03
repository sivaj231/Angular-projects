import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { read } from '@popperjs/core';
import { AppConstants } from 'src/app/constants/AppConstants';
import { ComplianceService } from 'src/app/services/compliance.service';
import { CompliancesService } from 'src/app/services/compliances.service';
import { DataTableService } from 'src/app/services/dataTableService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compliances',
  templateUrl: './compliances.component.html',
  styleUrls: ['./compliances.component.scss']
})
export class CompliancesComponent implements OnInit {

  expDate:boolean = false;

  nonEditView:boolean = false;

  tableGrid : boolean = true;

  form : boolean = false;

  viewCom : boolean = false;

  addEditComView : boolean = false;

  isChecked : boolean;

  allPolicyType :any = [];

  fillterPolicyType : any = [];

  allFile : any = [];

  compliancesList : any =[];

  compliancesDetails : any =[];

  file : any = File; 
  
  compliancesFormDetails : FormGroup;

  compliancesFormFilter : FormGroup;

  formData : FormData = new FormData();

  pdfFile;

  formFillterStatus : boolean = false;

  constructor(private fb : FormBuilder, 
    private compliancesService : CompliancesService,
    private  dataTableService: DataTableService,
    private complianceService : ComplianceService) {
      this.getAllCompliances();
      this.getPolicyTypeActive();
      this.getPolicyAll();
     
     }

  ngOnInit(): void {

    this.compliancesFormFilter = this.fb.group({
      policyId:[null],
      policyType:[null],
      startDate:[null],
      endDate:[null],
      status:[null]

    });

    this.compliancesFormDetails = this.fb.group({
      policyId :new FormControl('',[Validators.required]),
      policyType:['',[Validators.required]],
      startDate:['',[Validators.required]],     
      dateStatus:['',[Validators.required]],
      //endDate:['',[Validators.required]],
      endDate:[''],
      policyUpload:[''],
      action: [AppConstants.NEW, [Validators.required]],
      status :new FormControl('')
    });

    

  }

  showForm(){
    this.form = true;
    this.addEditComView=true;
    this.tableGrid = false;
    this.viewCom = true;
    this.nonEditView = false;
    this.compliancesFormDetails.reset();
    this.compliancesFormDetails.patchValue({ action : AppConstants.NEW });
  }

  showGrid(){
    this.addEditComView= false;
    this.tableGrid=true;
    this.viewCom =false;
    this.nonEditView = false;
    this.formFillterStatus = false;
  }

  fileChange(event){
    let fileList : FileList = event.target.files;
    if(fileList.length > 0){
      let files : File = fileList[0];
      console.log("file:" + files.size);
      console.log("file:" + files.name);
      console.log("file:" + files.type);
      console.log(files.name.split(".")[1]);
      let fileType = files.name.split(".")[1];
      if(fileType != "pdf" ){
        Swal.fire({
          icon: 'warning',
          title: '',
          text: "Only Upload Pdf File",
        });
      }
      this.file = files;
      //this.formData.append('policyFile',file);
    }
  }

  dateChange(event){
   
    if(event === "expDate"){
      this.expDate = true;
    }else{
      this.expDate = false;
    }  
    
  }



  save(comForm){
    let res : boolean = comForm;
    //alert(this.file.length);
    if(this.file.length == 2 && this.compliancesFormDetails.get('action').value=="NEW"){
      alert("Please Upload a File..");
    }else{
    const comData = {
      'policyId'   : this.compliancesFormDetails.get('policyId').value,
      'policyType' : this.compliancesFormDetails.get('policyType').value,
      'startDate'  : this.compliancesFormDetails.get('startDate').value,
      'dateStatus'  : this.compliancesFormDetails.get('dateStatus').value,
      'endDate'  : this.compliancesFormDetails.get('endDate').value,
      'action' : this.compliancesFormDetails.get('action').value,
      'status' :this.compliancesFormDetails.get('status').value
    }
    this.formData = new FormData();
    this.formData.append('policyFile',this.file);
    this.formData.append("compliances",JSON.stringify(comData));

    if(res){      
      this.compliancesService.savePolicy(this.formData).subscribe((data) =>{
        if(data['status'] == AppConstants.SUCCESS){

          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {
              this.getAllCompliances();
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
  }

  editCompliances(input){
    this.showForm();
    this.compliancesFormDetails.patchValue({
      policyId : input.policyId,
      policyType : input.policyType,
      startDate : input.startDate,
      dateStatus : input.dateStatus,
      endDate : input.endDate,
      policyFile : input.policyUpload,
      status :input.status,
      action:AppConstants.EDIT
    });
    if(input.dateStatus === 'expDate'){
      this.expDate = true;
    }else{
      this.expDate = false;
    }
    
  }
  
  getAllCompliances(){
    this.dataTableService.dataTableDestory();

    this.compliancesService.getAllCompliances().subscribe((data : any) => {
      
      this.compliancesList = data.responseDto;     

      this.dataTableService.dataTableReinitalize();
    });
    
  }

  viewCompliancesDetailsById(input){
    let req = {policyId: input}
    this.compliancesService.getComplinacesById(req).subscribe((data:any) => {
        this.compliancesDetails = data.responseDto[0];        
    });

    this.viewCom = true;

    this.tableGrid = false;

    this.addEditComView = false;

    this.nonEditView = true;
  }

 

  viewFile(input){
    let req ={policyId: input}
    this.compliancesService.viewFile(req).subscribe((data:any) => {
      this.allFile = data.responseDto[0];

      let byteCharacters = atob(this.allFile.policyFile);
      let byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
      let byteArray = new Uint8Array(byteNumbers);
     
        
        let file = new Blob([byteArray], { type: 'application/pdf;base64' });
        let fileURL = URL.createObjectURL(file);
        this.pdfFile = fileURL;
        window.open(fileURL);

      // const linkSource = 'data:application/pdf;base64,' + this.allFile.strBase64+"\n";
      // const downloadLink = document.createElement("a");
      // const fileName = this.allFile.policyFileName;
      // downloadLink.href = linkSource;
      // downloadLink.download = fileName;
      // downloadLink.target ="blank";
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
      // document.body.removeChild(downloadLink);

    });
    
  }

  getPolicyAll(){
    this.complianceService.getAllComplinace().subscribe((data : any) =>{     
      this.allPolicyType= data.responseDto;
      //this.fillterPolicyType = data.responseDto;
    });
  }
  
  getPolicyTypeActive(){
    this.complianceService.getAllComplinaceTypeActive().subscribe((data : any) =>{     
      //this.allPolicyType= data.responseDto;
      this.fillterPolicyType = data.responseDto;
    });
  }

  searchCompliances(){
    
    this.dataTableService.dataTableDestory();
    //alert(this.compliancesFormFilter.get('policyType').value);
    if(this.compliancesFormFilter.get('policyType').value != null || 
    this.compliancesFormFilter.get('startDate').value != null || 
    this.compliancesFormFilter.get('endDate').value !=  null  ||
    this.compliancesFormFilter.get('status').value != null)
    {
      this.compliancesService.searchCompliances(this.compliancesFormFilter.value).subscribe((data:any) => {
        this.compliancesList =data.responseDto;
        this.formFillterStatus = false;
        this.dataTableService.dataTableReinitalize();
      });
    }else{
      this.formFillterStatus = true;
      Swal.fire({
        icon: 'error',
        title: '',
        text: "Please Select Minimum One Option.",
      })
    }

    

  }
  searchCompliancesReset(){
    this.compliancesFormFilter.reset();
    this.getAllCompliances();
    this.formFillterStatus = false;
  }
  
  get validate_form() { return this.compliancesFormDetails.controls; }


  

}
