import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppMasterService } from '../../../services/appmasterService';
import { DataTableService } from '../../../services/dataTableService';
import Swal from 'sweetalert2';

import { AppConstants } from "../../../constants/AppConstants";


@Component({
  selector: 'app-application-master',
  templateUrl: './application-master.component.html',
  styleUrls: ['./application-master.component.scss']
})

export class ApplicationMasterComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  appList: any[] = [];

  title: String = "Application Master";

  form: Boolean = false;

  readOnly: Boolean = false;

  formDetails: FormGroup;

  applicationSearchForm: FormGroup;
  selected: boolean;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private appmasterService: AppMasterService) {

    this.getallApplication();
  }

  ngOnInit(): void {

    this.applicationSearchForm = this.fb.group({

      applicationCode: [''],
      applicationName: [''],
      status: [''],

    });

    this.formDetails = this.fb.group({

      id: [''],
      applicationCode: ['', [Validators.required]],
      applicationName: ['', [Validators.required]],
      status: ['',[Validators.required]],
      action: [AppConstants.NEW, [Validators.required]],

    })



  }

  showForm() {

    this.title = "Add/ Edit Application";

    this.formDetails.reset();

    this.formDetails.patchValue({ action: AppConstants.NEW });

    this.form = true;

    this.tableGrid = false;

    this.readOnly = false;

  }

  get validate_form() { return this.formDetails.controls; }

  showGrid() {

    this.readOnly = false;

    this.title = "Application Master";

    this.form = false;

    this.tableGrid = true;

    this.getallApplication();

  }

  getallApplication() {

    this.dataTableService.dataTableDestory();

    this.appmasterService.getallApplication().subscribe(data => {

      this.tableGridData = data['responseDto'];

      this.appList = data['responseDto'];

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
    this.applicationSearchForm = this.fb.group({

      applicationCode: [''],
      applicationName: [''],
      status: [''],

    });

  }

  save() {

    if (this.formDetails.valid) {

      this.appmasterService.saveAppMaster(this.formDetails.value).subscribe((data) => {

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
      })

    }
  }

  onChanged(deviceValue) {
    var dat = this.appList.filter((item) => {
      if(item.applicationCode==deviceValue){
        this.formDetails.controls.applicationName.setValue(item.applicationName);
      }else if(deviceValue==''){
        this.formDetails.controls.applicationName.setValue('')}});
    
}


  editApplication(input) {

    this.selected = false;

    this.showForm();

    this.readOnly = true;

    this.formDetails.patchValue(
      input
    );

    this.formDetails.patchValue(
      { action: AppConstants.EDIT }
    );

  }


  searchAppMaster() {

    if(this.applicationSearchForm.value.applicationCode=="" && this.applicationSearchForm.value.applicationName=="" && 
     this.applicationSearchForm.value.status==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.applicationSearchForm.valid) { 

          this.dataTableService.dataTableDestory();

         this.appmasterService.searchAppMaster(this.applicationSearchForm.value).subscribe((data: any) => {

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

  searchAppMasterReset() {

    this.applicationSearchForm.reset();

    this.getallApplication();

  }
  getAllData(){

    if(this.applicationSearchForm.value.applicationCode=="" && this.applicationSearchForm.value.applicationName=="" && 
     this.applicationSearchForm.value.status==""){

      this.dataTableService.dataTableDestory();

      this.getallApplication();
      
    }

  }


}
