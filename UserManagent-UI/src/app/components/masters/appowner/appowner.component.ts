import { EmployeeService } from './../../../services/employeeService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstants } from '../../../constants/AppConstants';


import { AppOwnerService } from "../../../services/appownerService";
import { AppMasterService } from '../../../services/appmasterService';
import { DataTableService } from '../../../services/dataTableService';


@Component({
  selector: 'app-appowner',
  templateUrl: './appowner.component.html',
  styleUrls: ['./appowner.component.scss']
})
export class AppownerComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  appOwnerList: any[] = [];

  appList: any[] = [];

  empList: any[] = [];

  title: String = "App Owner Master";

  form: Boolean = false;

  formDeatils: FormGroup;

  appOwnerSearchForm: FormGroup;

  readOnly: boolean;
  appLists: any;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private employeeService: EmployeeService, private appOwnerService: AppOwnerService, private fb: FormBuilder, private appmasterService: AppMasterService) {


  }

  ngOnInit(): void {

    this.getAllAppOwner();

    this.getAllEmp();

    this.appOwnerSearchForm = this.fb.group({

      applicationName: [''],
      applicationOwner: [''],
      status: [''],

    });


    this.formDeatils = this.fb.group({

      id: [''],
      applicationName: ['', [Validators.required]],
      applicationOwner: ['', [Validators.required]],
      status: ['',[Validators.required]],
      action: [AppConstants.NEW, [Validators.required]],


    })

    this.getallApplication();

  }

  get validate_form() { return this.formDeatils.controls; }

  showForm() {

    this.formDeatils.reset();

    this.formDeatils.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit App Owner";

    this.form = true;

    this.tableGrid = false;

  }

  showGrid() {

    this.readOnly = false;

    this.title = "App Owner Master";

    this.form = false;
    
    this.tableGrid = true;

    this.getAllAppOwner();

  }

  getAllAppOwner() {

    this.dataTableService.dataTableDestory();

    this.appOwnerService.getAllAppOwner().subscribe(data => {

    this.tableGridData = data['responseDto'];

    this.appOwnerList = data['responseDto'];

    // console.log(this.tableGridData)
    // console.log(this.appList)
    // console.log(this.empList)
  })
   

  }

  getallApplication() {


    this.dataTableService.dataTableDestory();

    this.appmasterService.getAllApplicationandEmployee().subscribe(data =>{

      this.appList = data['responseDto'];

      if(this.appList.length>0){
      
      }else{
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Total No. of  '+this.appList.length+' Data',
        })
      }
  
      this.dataTableService.dataTableReinitalize();
  
      
      this.appOwnerSearchForm = this.fb.group({
  
        applicationName: [''],
        // empId: [''],
        applicationOwner: [''],
        status: [''],
  
      });

    }) 

    this.appmasterService.getAllApplication().subscribe(data => {
     
      this.appLists = data['responseDto'];
  
      // console.log(this.appLists)
  
      })
  
      this.appmasterService.getAllEmployee().subscribe(data =>{
  
        this.empList = data['responseDto'];
  
        // console.log(this.empList)
  
      }) 

      

  }


  save() {

    var searchEmpid;
    var searchAppid;
    
    var dat = this.appLists.filter((item) => {
      if(item.applicationName.toUpperCase()==this.formDeatils.value.applicationName.toUpperCase()){
        searchAppid = item.applicationCode;
        this.formDeatils.controls.applicationName.setValue(searchAppid);
      }});
    
      
    var dat1 = this.empList.filter((item) => {
      if(item.empName.toUpperCase()==this.formDeatils.value.applicationOwner.toUpperCase()){
        searchEmpid = item.empId;
        this.formDeatils.controls.applicationOwner.setValue(searchEmpid);
      }});
    
      var datas = { 
        applicationCode:searchAppid, 
        applicationOwner:searchEmpid,
        status:this.formDeatils.value.status
     }; 

    //  console.log(this.formDeatils.value)

    if (this.formDeatils.valid) {

      this.appOwnerService.saveAppOwner(this.formDeatils.value).subscribe((data) => {

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

        }else if(data['status'] == AppConstants.FAILURE){

          Swal.fire({
            icon: 'error',
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
    var dat = this.appOwnerList.filter((item) => {
      if(item.applicationName==deviceValue){
        // this.formDeatils.controls.empId.setValue(item.empId);
        this.formDeatils.controls.applicationOwner.setValue(item.applicationOwner);
      }else if(deviceValue==''){
        this.appOwnerSearchForm.controls.departmentName.setValue('')}});
    
}

  editDesignation(input) {

    this.showForm();
    // console.log(input)
    
    this.formDeatils.patchValue({
      applicationName: input.applicationCode,
      applicationOwner: input.applicationOwner,
      status: input.status,
    }
    );

              // console.log(input)


    this.formDeatils.patchValue({ action: AppConstants.EDIT });

  }
  searchAppOwner() {

    var searchEmpid;
    var searchAppid;
    
    var dat = this.appLists.filter((item) => {
      if(item.applicationName.toUpperCase()==this.appOwnerSearchForm.value.applicationName.toUpperCase()){
        searchAppid = item.applicationCode;
      }});
    
      
    var dat1 = this.empList.filter((item) => {
      if(item.empName.toUpperCase()==this.appOwnerSearchForm.value.applicationOwner.toUpperCase()){
        searchEmpid = item.empId;
      }});
    
      var datas = { 
        applicationCode:searchAppid, 
        applicationOwner:searchEmpid,
        status:this.appOwnerSearchForm.value.status
     }; 

    if(this.appOwnerSearchForm.value.applicationOwner=="" && this.appOwnerSearchForm.value.applicationName=="" && 
     this.appOwnerSearchForm.value.status==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.appOwnerSearchForm.valid) { 

          this.dataTableService.dataTableDestory();

          this.appOwnerService.searchAppOwner(datas).subscribe((data: any) => {

          this.appList = data.responseDto;

          // console.log(this.appList)

          if(this.appList.length>0){

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

  searchAppOwnerReset() {

    this.appOwnerSearchForm.reset();

    this.getallApplication();

  }

  getAllEmp() {

    this.employeeService.getAllEmployee().subscribe((data: any) => {

    this.empList = data.responseDto;


    })

  }
  getAllData(){

    if(this.appOwnerSearchForm.value.applicationOwner=="" && this.appOwnerSearchForm.value.applicationName=="" && 
     this.appOwnerSearchForm.value.status==""){

      this.dataTableService.dataTableDestory();

      this.getallApplication();
      
    }

  }


}
