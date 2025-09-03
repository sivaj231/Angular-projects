import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";
import { DataTableService } from '../../../services/dataTableService';
import { DepartmentService } from '../../../services/departmentService';



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  departmentList: any[] = [];

  title: String = "Department Master";

  form: Boolean = false;

  readOnly: Boolean = false;

  formDetails: FormGroup;

  deptSearchForm: FormGroup;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private departmentService: DepartmentService) {

  }

  ngOnInit(): void {

    this.deptSearchForm = this.fb.group({

      departmentCode: '',
      departmentName: '',
      status: '',

    });

    this.formDetails = this.fb.group({

      departmentCode: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      status: ['',[Validators.required]],
      action: [AppConstants.NEW, [Validators.required]],

    });

    this.getAllDepartment();
  }

  showForm() {

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.title = "Add/ Edit Department";

    this.form = true;
    
    this.tableGrid = false;

  }

  get validate_form() { return this.formDetails.controls; }

  showGrid() {

    this.readOnly = false;

    this.title = "Department Master";

    this.form = false;

    this.tableGrid = true;

    this.getAllDepartment();

  }

  getAllDepartment() {

    this.dataTableService.dataTableDestory();

    this.departmentService.getAllDepartment().subscribe(data => {

    this.tableGridData = data['responseDto'];

    this.departmentList = data['responseDto'];

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

    this.deptSearchForm = this.fb.group({

      departmentCode: [''],
      departmentName: [''],
      status: [''],

    })
  }

  save() {

    if (this.formDetails.valid) {

      this.departmentService.saveDepartment(this.formDetails.value).subscribe((data) => {
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

      })

    }

  }

  onChanged(deviceValue) {
    var dat = this.departmentList.filter((item) => {
      if(item.departmentCode==deviceValue){
        this.formDetails.controls.departmentName.setValue(item.departmentName);
      }else if(deviceValue==''){
        this.formDetails.controls.departmentName.setValue('')}});
    
}


  editDepartment(input) {

    this.showForm();

    this.readOnly = true;

    this.formDetails.patchValue(
      {
        departmentCode:input.departmentCode,
        departmentName: input.departmentName,
        action: AppConstants.EDIT,
        status: input.status,
      }
    );
  }
  searchDepartment() {
    
    if(this.deptSearchForm.value.departmentCode=="" && this.deptSearchForm.value.departmentName=="" && 
     this.deptSearchForm.value.status==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.deptSearchForm.valid) { 

      this.dataTableService.dataTableDestory();

      this.departmentService.searchDepartment(this.deptSearchForm.value).subscribe((data: any) => {

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

  searchDepartmentReset() {

    this.deptSearchForm.reset();

    this.getAllDepartment();

  }
  getAllData(){

    if(this.deptSearchForm.value.departmentCode=="" && this.deptSearchForm.value.departmentName=="" && 
     this.deptSearchForm.value.status==""){

      this.dataTableService.dataTableDestory();

      this.getAllDepartment();
      
    }

  }

}
