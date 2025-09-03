import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/AppConstants';
import { AupPolicyService } from 'src/app/services/aup_policy.service';
import Swal from 'sweetalert2';
// import { AupPolicyDto } from 'src/app/services/aup_policy_dto';

@Component({
  selector: 'app-auppolicy',
  templateUrl: './auppolicy.component.html',
  styleUrls: ['./auppolicy.component.scss']
})
export class AuppolicyComponent implements OnInit {

  tableGrid : boolean = true;

  form : boolean = false;

  viewAup : boolean = false;

  addEditAupView : boolean = false;

  isChecked : boolean;

 
  
  aupFormDetails : FormGroup;

  aupFormFilter : FormGroup;

  formData : FormData = new FormData();

  constructor(private fb : FormBuilder,private aupPolicyService : AupPolicyService) { }

  ngOnInit(): void {

    this.aupFormDetails = this.fb.group({
      aupPolicyId :new FormControl('',[Validators.required]),
      effectiveDate:['',[Validators.required]],
      policyUpload:['',[Validators.required]],
      policyDescription:['',[Validators.required]],
      agreementStatus:['',[Validators.required]]
    });

    this.aupFormFilter = this.fb.group({
      fillterPolicyNo:['',[Validators.required]],
      filterEffectiveDate:['',[Validators.required]]
    });

  }

  showForm(){
    this.form = true;
    this.addEditAupView=true;
    this.tableGrid = false;
    this.viewAup = true;
  }

  showGrid(){
    this.addEditAupView= false;
    this.tableGrid=true;
    this.viewAup =false;
  }

  fileChange(event){
    let fileList : FileList = event.target.files;
    if(fileList.length > 0){
      let file : File = fileList[0];
      console.log("file:" + file.size);
      console.log("file:" + file.name);
      console.log("file:" + file.type);
      this.formData.append('policyFile',file);
    }
  }


  save(aupForm){
    let res : boolean = aupForm;
    this.formData.append('aupPolicyId',this.aupFormDetails.get('aupPolicyId').value);
    this.formData.append('effectiveDate',this.aupFormDetails.get('effectiveDate').value);
    this.formData.append('description',this.aupFormDetails.get('policyDescription').value);
    this.formData.append('agreementStatus',this.aupFormDetails.get('agreementStatus').value);
    

    
    if(res){      
      this.aupPolicyService.savePolicy(this.formData).subscribe((data) =>{
        if(data['status'] == AppConstants.SUCCESS){

          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {


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

  get validate_form() { return this.aupFormDetails.controls; }

  
}
