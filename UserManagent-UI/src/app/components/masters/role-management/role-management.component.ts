import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";

import { RoleService } from "../../../services/roleService";
import { DataTableService } from 'src/app/services/dataTableService';
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  tableGrid: Boolean = true;

  tableGridData: any[] = [];
  usersList: any[] = [];
  roleList: any[] = [];
  title: String = "RoleManagement";
  selectedRole: String = "";
  form: Boolean = false;
  roleSearchForm: FormGroup;
  formDetails: FormGroup;
  readOnly: boolean;

  // formDetails = new FormGroup({
  //   roleCode: new FormControl(''),
  //   roleName: new FormControl(''),
  //   status: new FormControl(''),
  //   action: new FormControl(AppConstants.NEW)
  // });


  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private roleService: RoleService) {

  }

  ngOnInit(): void {

    this.roleSearchForm = this.fb.group({
      
      roleCode: '',
      roleName: '',
      status: '',

    });
    this.formDetails = this.fb.group({


      roleCode: ['', [Validators.required]],
      // password: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      action: new FormControl(AppConstants.NEW)

    })

    this.getAllRole();

  }
  get validate_form() {return this.formDetails.controls; }

  getAllRole() {

    this.dataTableService.dataTableDestory();

    this.roleService.getAllRole().subscribe(data => {
    this.tableGridData = data['responseDto'];
    this.roleList = data['responseDto'];

    if(this.tableGridData.length>0){
      
    }else{
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Total No. of  '+this.tableGridData.length+' Data',
      })
    }

      this.dataTableService.dataTableReinitalize();

    })
    this.roleSearchForm = this.fb.group({

      roleCode: '',
      roleName: '',
      status: '',

    });

  }
  onChanged(deviceValue) {
    var dat = this.roleList.filter((item) => {
      if(item.roleCode==deviceValue){
          this.formDetails.controls.roleName.setValue(item.roleName);
      }else if(deviceValue==''){
          this.formDetails.controls.userName.setValue('')}});
    
}

  showGrid() {

    this.readOnly = false;

    this.title = "RoleManagement";

    this.form = false;
    this.tableGrid = true;

    this.getAllRole();


  }

  showForm() {

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit Role";

    this.form = true;
    this.tableGrid = false;
  }

  save() {
    
    if(this.formDetails.valid){

      console.log(this.formDetails.value)
    this.roleService.saveRole(this.formDetails.value).subscribe((data) => {

      if (data['status'] == AppConstants.SUCCESS) {

        Swal.fire({
          icon: 'success',
          title: '',
          text: data['msg'],
        }).then((result) => {
          if (result.isConfirmed) {

            this.showGrid();

          } else if (result.isDenied) {

          }
        })

      } else {

        Swal.fire({
          icon: 'error',
          title: '',
          text: data['exceptionMsg'],
        })
        

      }
      // console.log("res" + JSON.stringify(data))
    });
  }


  }

  editRole(input) {

    this.readOnly = true;

    this.showForm();

    this.formDetails.patchValue(
      input
    );

    this.formDetails.patchValue({ action: AppConstants.EDIT });

  }

  searchRole() {
    if(this.roleSearchForm.value.roleCode=="" && this.roleSearchForm.value.roleName=="" && 
    this.roleSearchForm.value.status=="" ){
     
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
   }else{
      
    if (this.roleSearchForm.valid) { 

    this.dataTableService.dataTableDestory();

    this.roleService.searchRole(this.roleSearchForm.value).subscribe((data: any) => {

    this.tableGridData = data.responseDto;

    if(this.tableGridData.length>0){

    
      }else{
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Total No. of  '+this.tableGridData.length+' Data',
        })
    }

    this.dataTableService.dataTableReinitalize();

    })
  }
  }
}

  searchRoleReset() {

    this.roleSearchForm.reset();

    this.getAllRole();

  }


  viewUserByRole(input) {

    let req = { "roleName": input.roleName };

    this.selectedRole = input.roleName;

    this.roleService.viewUserByRole(req).subscribe((data: any) => {

    this.usersList = data.responseDto;

    })

  }
  getAllData(){

    if(this.roleSearchForm.value.roleCode=="" && this.roleSearchForm.value.roleName=="" && 
    this.roleSearchForm.value.status=="" ){

      this.dataTableService.dataTableDestory();

      this.getAllRole();
    }

  }

}
