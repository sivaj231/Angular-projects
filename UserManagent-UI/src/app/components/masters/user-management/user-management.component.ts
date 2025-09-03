import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";
import { UserService } from '../../../services/userService';
import { RoleService } from '../../../services/roleService';
import { BranchService } from '../../../services/branchService';
import { EmployeeService } from '../../../services/employeeService';
import { DataTableService } from '../../../services/dataTableService';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  tableGrid: Boolean = true;

  tableGridData: any[] = [];
  title: String = "UserManagement";
  form: Boolean = false;
  formDeatils: FormGroup;
  userSearchForm: FormGroup;

  roleList: any[] = [];

  branchList: any[] = [];
  employeeList: any[] = [];
  readOnly = false;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private userService: UserService, private roleService: RoleService, private branchService: BranchService, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {

    this.userSearchForm = this.fb.group({

      empId: [''],
      userName: [''],
      roleName: [''],
      status: [''],

    })


    this.formDeatils = this.fb.group({

      empId: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      status: ['',],
      action: [AppConstants.NEW],

    })

    this.getAllRole();

    this.getAllBranch();

    this.getAllUser();

    this.getAllEmployee();

  }

  get validate_form() {return this.formDeatils.controls; }
  

  getAllUser() {

    this.dataTableService.dataTableDestory();

    this.userService.getAllUsers().subscribe(data => {

    this.tableGridData = data['responseDto'];

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
    this.userSearchForm = this.fb.group({

        empId: ['',],
        userName: ['',],
        roleName: ['',],
        status: ['',],
  
      })

  }

  getAllEmployee() {

    this.employeeService.getAllEmployee().subscribe((data: any) => {

    this.employeeList = data.responseDto;

    })

  }
  onChanged(deviceValue) {

    var dat = this.employeeList.filter((item) => {
      if(item.empId==deviceValue){
            this.formDeatils.controls.userName.setValue(item.empName);
      }else if(deviceValue==''){
            this.formDeatils.controls.userName.setValue('')}});
    
}

  getAllRole() {
    
    this.roleService.getAllRole().subscribe(data => {
    
    this.roleList = data['responseDto'];

    })
  }

  getAllBranch() {

    this.branchService.getAllBranch().subscribe(data => {
    
    this.branchList = data['responseDto'];
    
    })
  }

  showGrid() {

    this.readOnly = false;

    this.title = "UserManagement";

    this.form = false;
    
    this.tableGrid = true;

    this.getAllUser();

  }
  showForm() {

    this.formDeatils.reset();

    this.formDeatils.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit User";

    this.form = true;
    
    this.tableGrid = false;

  }

  save() {
    // alert(this.formDeatils.valid)

    if (this.formDeatils.valid) {

      this.userService.saveUser(this.formDeatils.value).subscribe((data) => {

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


  editUser(input) {

    this.readOnly = true;

    this.showForm();

    this.formDeatils.patchValue(
      input
    );

    this.formDeatils.patchValue({ action: AppConstants.EDIT });

  }

  searchEmployee() {

    if(this.userSearchForm.value.roleName=="" && this.userSearchForm.value.userName=="" && 
     this.userSearchForm.value.empId=="" && this.userSearchForm.value.status==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })

    }else{
      
    if (this.userSearchForm.valid) { 
    
    this.dataTableService.dataTableDestory();

    this.userService.searchUser(this.userSearchForm.value).subscribe(data => {(data['responseDto']);
    
    this.tableGridData = data['responseDto'];
    
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


  searchEmployeeReset() {

    this.userSearchForm.reset;

    this.getAllUser();

  }
  getAllData(){

    if(this.userSearchForm.value.roleName=="" && this.userSearchForm.value.userName=="" && 
     this.userSearchForm.value.empId=="" && this.userSearchForm.value.status==""){

      this.dataTableService.dataTableDestory();

      this.getAllUser();
    }

  }

}
