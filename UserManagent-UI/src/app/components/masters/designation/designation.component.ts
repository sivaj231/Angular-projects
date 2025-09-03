import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstants } from 'src/app/constants/AppConstants';

import { DesignationService } from "../../../services/designationService";
import { DataTableService } from '../../../services/dataTableService';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {


  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  designationList: any[] = [];

  empList: any[] = [];

  title: String = "Designation Master";

  form: Boolean = false;

  formDetails: FormGroup;

  designationSearchForm: FormGroup;
  
  readOnly: boolean;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private designationService: DesignationService) {

    this.getAllDesignation();

  }

  ngOnInit(): void {

    this.designationSearchForm = this.fb.group({

      designationCode: '',
      designation: '',
      status: '',

    });

    this.formDetails = this.fb.group({

      designationCode: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      reportdesignation:['',[Validators.required]],
      status: ['',[Validators.required]],
      action: [AppConstants.NEW, [Validators.required]],

    })

  }

  showForm() {

    this.readOnly = false;

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit Designation";

    this.form = true;

    this.tableGrid = false;

  }

  get validate_form() { return this.formDetails.controls; }

  showGrid() {

    this.readOnly = false;

    this.title = "Designation Master";

    this.form = false;

    this.tableGrid = true;

    this.getAllDesignation();

  }

  getAllDesignation() {

    this.dataTableService.dataTableDestory();

    this.designationService.getAllEmployee().subscribe(data =>{

      this.empList = data['responseDto'];

    });

    this.designationService.getAllDesignation().subscribe(data => {

    this.tableGridData = data['responseDto'];

    // console.log(this.tableGridData)
      
    this.designationList = data['responseDto'];

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
    this.designationSearchForm = this.fb.group({

      designationCode: [''],
      designation: [''],
      status: [''],

    })

  }

  save() {

    if (this.formDetails.valid) {


      this.designationService.saveDesignation(this.formDetails.value).subscribe((data) => {

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

      });

    }

  }

  onChanged(deviceValue) {
    
    var dat = this.designationList.filter((item) => {
      if(item.designationCode==deviceValue){
        this.formDetails.controls.designation.setValue(item.designation);
      }else if(deviceValue==''){
        this.formDetails.controls.designation.setValue('')}});
    
}


  editDesignation(input) {

    // console.log(input)

    this.showForm();

    this.readOnly = true;

    // console.log(input.reportdesignation)

    this.formDetails.patchValue(
      {
        designationCode: input.designationCode,
        designation: input.designation,
        reportdesignation: input.reportdesignation,
        action: AppConstants.EDIT,
        status: input.status,
      }
    );

  }
  searchDesignation() {

    if(this.designationSearchForm.value.designationCode=="" && this.designationSearchForm.value.designation=="" && 
     this.designationSearchForm.value.status==""){

      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }else{

      if (this.designationSearchForm.valid) { 

        this.dataTableService.dataTableDestory();

        this.designationService.searchDesignation(this.designationSearchForm.value).subscribe((data: any) => {

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

  searchDesignationReset() {

    this.designationSearchForm.reset();

    this.getAllDesignation();

  }
  getAllData(){
    
    if(this.designationSearchForm.value.designation=="" && this.designationSearchForm.value.designationCode=="" && 
     this.designationSearchForm.value.status==""){

      this.dataTableService.dataTableDestory();

      this.getAllDesignation();
      
    }

  }

}
