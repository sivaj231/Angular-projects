import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";

import { ITSupportService } from './../../../services/itsupportService';
import { EmployeeService } from '../../../services/employeeService';
import { AppMasterService } from '../../../services/appmasterService';
import { DataTableService } from '../../../services/dataTableService';


@Component({
  selector: 'app-it-support-mapping',
  templateUrl: './it-support-mapping.component.html',
  styleUrls: ['./it-support-mapping.component.scss']
})
export class ItSupportMappingComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  itsupportList:any[] = [];

  employeeList: any[] = [];

  appList: any[] = [];

  title: String = "ITSupportMapping";

  form: Boolean = false;

  formDetails: FormGroup;

  itSearchForm: FormGroup;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private itSupportService: ITSupportService, private employeeService: EmployeeService, private appmasterService: AppMasterService) {

    this.getAllITSupport();

  }

  ngOnInit(): void {

    this.itSearchForm = this.fb.group({

      applicationName: '',
      empId: '',
      status: '',

    });

    this.formDetails = this.fb.group({

      id: [''],
      applicationName: ['', [Validators.required]],
      empId: ['', [Validators.required]],
      status: [''],
      action: [AppConstants.NEW, [Validators.required]],

    })

    this.getAllEmployee();

    this.getallApplication();

  }

  get validate_form() { return this.formDetails.controls; }

  getAllITSupport() {

    this.dataTableService.dataTableDestory();

    this.itSupportService.getAllItsupport().subscribe(data => {

      this.tableGridData = data['responseDto'];

      this.itsupportList = data['responseDto'];

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
    this.itSearchForm = this.fb.group({

      applicationName: '',
      empId: '',
      status: '',

    });

  }


  getallApplication() {

    this.appmasterService.getallApplication().subscribe(data => {
      // console.log("---" + JSON.stringify(data))
      this.appList = data['responseDto'];
    })


  }

  getAllEmployee() {

    this.employeeService.getAllEmployee().subscribe((data: any) => {

      this.employeeList = data.responseDto;

    })

  }

  showGrid() {

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.title = "ITSupportMapping";

    this.form = false;
    this.tableGrid = true;

    this.getAllITSupport();

  }

  showForm() {

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit ITSupportMapping";

    this.form = true;
    this.tableGrid = false;

  }

  save() {

    if (this.formDetails.valid) {

      this.itSupportService.saveItsupport(this.formDetails.value).subscribe((data) => {

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


  editItSupport(input) {

    this.showForm();
    

    this.formDetails.patchValue(
      input
    );

    this.formDetails.patchValue({ action: AppConstants.EDIT });

  }


  searchITSupport() {
    
    if(this.itSearchForm.value.applicationName=="" && this.itSearchForm.value.empId=="" && 
     this.itSearchForm.value.status==""){

      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.itSearchForm.valid) { 
        
        this.dataTableService.dataTableDestory();

         this.itSupportService.searchITSupport(this.itSearchForm.value).subscribe((data: any) => {

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

  searchITSupportReset() {

    this.itSearchForm.reset();

    this.getAllITSupport();

  }

  getAllData(){

    if(this.itSearchForm.value.applicationName=="" && this.itSearchForm.value.empId=="" && 
     this.itSearchForm.value.status==""){

      this.dataTableService.dataTableDestory();

      this.getAllITSupport();
      
    }

  }

}
