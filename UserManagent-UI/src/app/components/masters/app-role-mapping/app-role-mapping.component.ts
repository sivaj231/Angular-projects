import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";

import { AppMasterService } from '../../../services/appmasterService';
import { AppRoleMappingService } from "../../../services/app_role_mapping_service";
import { DataTableService } from '../../../services/dataTableService';

@Component({
  selector: 'app-app-role-mapping',
  templateUrl: './app-role-mapping.component.html',
  styleUrls: ['./app-role-mapping.component.scss']
})
export class AppRoleMappingComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  appList: any[] = [];

  appRoleList: any[] = [];

  applicationRoleMappingDtoList: any[] = [];

  applicationRoleMappingDtoListOriginal: any[] = [];

  title: String = "Application Role Mapping";

  form: Boolean = false;

  formDetails: FormGroup;

  appRoleSearchForm: FormGroup;


  constructor(private dataTableService: DataTableService, private fb: FormBuilder, private appRoleMappingService: AppRoleMappingService, private appmasterService: AppMasterService) {

  }

  ngOnInit(): void {

    this.appRoleSearchForm = this.fb.group({

      applicationName: '',
      roleCode: '',
      // roleCode: '',
      roleName: '',
      // status: '',

    });

    this.formDetails = this.fb.group({
      id: [''],
      applicationCode: ['', [Validators.required]],
      applicationName: ['', [Validators.required]],
      roleCode: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      roleDescription:['',[Validators.required]],
      status: [''],
      action: AppConstants.NEW
    })

    this.getAllAppMappedRoleList();
    this.getallApplication();

  }

  get validate_form() {
    return this.formDetails.controls;
  }


  getallApplication() {

    this.appmasterService.getallApplication().subscribe(data => {
      this.appList = data['responseDto'];
    })


  }

  onChanged(deviceValue) {
    var dat = this.appList.filter((item) => {
      if(item.applicationCode==deviceValue){
        this.formDetails.controls.applicationName.setValue(item.applicationName);
      }else if(deviceValue==''){
        this.formDetails.controls.departmentName.setValue('')}});
    
}

  addApp() {

    if (this.formDetails.valid) {

      this.appRoleMappingService.findExist(this.formDetails.value).subscribe((data) => {

        if (data['status'] != AppConstants.APPLICATION_NAME_AND_ROLE_NAME_ALREADY_EXISTS) {

          if(this.applicationRoleMappingDtoList.length>0){

            let res : Boolean= false;
            this.applicationRoleMappingDtoList.forEach((element) => {
              // debugger
            
              if((element.applicationName==this.formDetails.value.applicationName) && (element.roleName == this.formDetails.value.roleName)){
                res= true;
                Swal.fire({
                  icon: 'warning',
                  title: '',
                  text: 'Already Role Mapped..!',
                })
              }
                           
          });
      
          if(!res){
            this.applicationRoleMappingDtoList.push(this.formDetails.value);
            res =false;
          }
        }
         else {
            this.applicationRoleMappingDtoList.push(this.formDetails.value);
         }

        }else{
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Rolename Already Mapped with this Application Name...!',
          })
        }

      });

    }

  //     if(this.applicationRoleMappingDtoList.length>0){

  //     let res : Boolean= false;
  //     this.applicationRoleMappingDtoList.forEach((element) => {
      
  //       if((element.applicationCode==this.formDetails.value.applicationCode) && (element.roleCode == this.formDetails.value.roleCode)){
  //         res= true;
  //         Swal.fire({
  //           icon: 'warning',
  //           title: '',
  //           text: 'Already Role Mapped by To This Application..!',
  //         })
  //       }
       
        
  //   });

  //   if(!res){
  //     this.applicationRoleMappingDtoList.push(this.formDetails.value);
  //     res =false;
  //   }
  // }
  //  else{
  //     this.applicationRoleMappingDtoList.push(this.formDetails.value);
  //  }
  }

  remove(index) {

    // this.app.removeAt(index);

    this.applicationRoleMappingDtoList.splice(index, 1);

  }

  showForm() {

    this.applicationRoleMappingDtoList = [];

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit Employee";

    this.form = true;
    this.tableGrid = false;

  }

  showGrid() {

    this.form = false;
    this.tableGrid = true;

    this.getAllAppMappedRoleList();

  }


  save() {

    if (this.formDetails.get('action').value == AppConstants.EDIT) {

      this.applicationRoleMappingDtoList = [];

      this.applicationRoleMappingDtoList.push(this.formDetails.value);

    }

    if (this.applicationRoleMappingDtoList.length > 0) {


      this.appRoleMappingService.saveAppRoleMapping(this.applicationRoleMappingDtoList).subscribe((data) => {

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

    }else{
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'There is Data Not Available',
      })
    }

  }

  getAllAppMappedRoleList() {

    this.dataTableService.dataTableDestory();

    this.appRoleMappingService.getApplicationGroupBy().subscribe((data: any) => {

      this.tableGridData = data.responseDto;

      console.log(this.tableGridData)
      // this.appRoleList = data.responseDto;
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

  edit(item) {

    // console.log(item);

    this.showForm();

    item.action = AppConstants.EDIT;

    this.formDetails.patchValue(item);

    this.formDetails.patchValue({ action: AppConstants.EDIT });


  }


  searchAppRole() {

    if(this.appRoleSearchForm.value.applicationName=="" && this.appRoleSearchForm.value.roleCode=="" && 
     this.appRoleSearchForm.value.roleName==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.appRoleSearchForm.valid) { 

      this.dataTableService.dataTableDestory();

      this.appRoleMappingService.searchAppRole(this.appRoleSearchForm.value).subscribe((data: any) => {

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

  searchAppRoleReset() {

    this.appRoleSearchForm.reset();

    this.getAllAppMappedRoleList();

  }

  getAllData(){
    
    if(this.appRoleSearchForm.value.applicationName=="" && this.appRoleSearchForm.value.roleCode=="" && 
     this.appRoleSearchForm.value.roleName==""){

      this.dataTableService.dataTableDestory();

      this.getAllAppMappedRoleList();
      
    }

  }

}
