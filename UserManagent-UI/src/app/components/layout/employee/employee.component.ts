import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

import { CommonDriveService } from 'src/app/services/commonDriveService';
import { DataTableService } from 'src/app/services/dataTableService';
import { itAssetMappingService } from 'src/app/services/itassetmappingservice';
import { itAssetService } from 'src/app/services/ITAssetService';
import { ReportDashboardService } from 'src/app/services/reportDashboardService';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";
import { AppRoleMappingService } from "../../../services/app_role_mapping_service";
import { BranchDto } from '../../../services/branchDto';
import { DepartmentService } from "../../../services/departmentService";
import { DesignationService } from "../../../services/designationService";
import { EmployeeService } from "../../../services/employeeService";
import { BranchService } from './../../../services/branchService';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  tableGrid: Boolean = true;

  employeeList: BranchDto[];

  title: String = "Employee Master";

  form: Boolean = false;

  nonEditView: Boolean = false;

  addEditView: Boolean = false;

  EditView: Boolean = false;

  editEmpFormApp: Boolean = false;

  finalDto: any[] = [];

  viewEmpFormApp: Boolean = false;

  readOnly: Boolean = false;

  formDeatils: FormGroup;

  empSearchForm: FormGroup;

  applicationForm: FormGroup;

  cliqViewReportForm: FormGroup;

  formAsset: FormGroup;

  commonDriveForm: FormGroup;

  applicationDetails = [];

  branchList = [];

  designationList = [];

  departmentList = [];

  mappedApplicationList = [];

  itAssetMaster = [];

  reportEmpDetails = {};

  mappedRoleList = [];

  selectedApplication: any[] = [];

  commonDriveList: any[] = [];

  roleManagementDtos: any[] = [];

  roleManagementDtosEdit: any[] = [];

  empDetails: any = [];

  assetIdList: any[] = [];

  application: Boolean = false;

  assetDetails: Boolean = false;

  viewEmployee: Boolean = false;

  breadCrumbleft: any = 'Employee Master';

  assetIdDetails: any = {};

  assetRequestDetails: any[] = [];

  commonDriveMasterList: any[] = [];

  reportsDashboardMasterList: any[] = [];

  reportsDashboardMappingList: any[] = [];

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;


  constructor(private dataTableService: DataTableService, private reportDashboardService: ReportDashboardService, private commonDriveService: CommonDriveService, private http: HttpClient, private fb: FormBuilder, private employeeService: EmployeeService, private designationService: DesignationService, private branchService: BranchService, private appRoleMappingService: AppRoleMappingService, private departmentService: DepartmentService, private spinner: NgxSpinnerService, private itAssetService: itAssetService, private itAssetMappingService: itAssetMappingService) {

    this.getAllEmployee();

    this.getAllBranch();

    this.getAllDesignation();

    this.getAllDepartment();

  }

  getAllBranch() {

    this.branchService.getAllBranch().subscribe((data: any) => {
      this.branchList = data.responseDto;
    })

  }

  getAllDesignation() {

    this.designationService.getAllDesignation().subscribe((data: any) => {
      this.designationList = data.responseDto;
    })

  }

  getAllDepartment() {

    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departmentList = data.responseDto;
    })

  }

  ngOnInit(): void {

    this.cliqViewReportForm = this.fb.group({

      id: ['', []],
      empId: ['', []],
      dashboardName: ['', []],
      status: ['', []]

    })

    this.commonDriveForm = this.fb.group({

      id: ['', []],
      empId: ['', []],
      pathName: ['', [Validators.required]],
      permission: ['', [Validators.required]],
      objectName:['',[Validators.required]],
      ouName:['',[Validators.required]],
      ownerempId:['',[]],
      status: ['', []],

    })


    this.applicationForm = this.fb.group({

      id: [''],
      applicationName: ['', [Validators.required]],
      applicationCode: ['', [Validators.required]],
      roleCode: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      status: [''],

    });

    this.empSearchForm = this.fb.group({

      empId: '',
      empName: '',
      branchName: '',
      department: '',
      status: '',

    });

    this.formAsset = this.fb.group({

      id: [''],
      assetType: ['', [Validators.required]],
      assetId: ['', [Validators.required]],
      serialNo: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      macAddress:[''],
      dateOfIssue: [],
      action: [AppConstants.NEW]

    })

    this.formDeatils = this.fb.group({

      empType: ['', [Validators.required]],
      empId: ['', [Validators.required]],
      empName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      department: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      reportUserId: ['', [Validators.required]],
      reportPersonName: ['', [Validators.required]],
      reportBranchCode: ['', [Validators.required]],
      reportBranchName: ['', [Validators.required]],
      status: [''],
      appDetailsDto: this.selectedApplication,
      itAssetDto: this.assetRequestDetails,
      action: new FormControl(AppConstants.NEW),

    })

    this.getAllAsset();

    this.getAllCommonDriveMasters();

    this.getAllReportDashboard();

  }

  get validate_form() { return this.formDeatils.controls; }

  get validate_app_form() { return this.applicationForm.controls; }

  get commonDrive_validate_form(){ return this.commonDriveForm.controls}

  get app() {

    return this.formDeatils.get('appDetailsDto') as FormArray;

  }

  app_form_reset() {

    this.applicationForm.reset();

    this.applicationForm.patchValue({ id: '' });

  }

  getAllCommonDriveMasters() {

    this.commonDriveService.getAllCommonDrive().subscribe((data: any) => {

      this.commonDriveMasterList = data.responseDto;

      console.log(this.commonDriveMasterList)

    });

  }

  addCommonDrive() {

    if (this.commonDriveForm.valid) {

      this.commonDriveForm.patchValue({ 
        empId: this.formDeatils.get('empId').value,  
        ownerempId: this.commonDriveForm.get('ownerempId').value
    });

      console.log(this.commonDriveForm.value)

      this.commonDriveService.mapDriveToEmp(this.commonDriveForm.value).subscribe((data: any) => {

        if (data.status === AppConstants.SUCCESS) {

          this.getEmpDetailsAfterUpdate(this.formDeatils.get('empId').value);

        }

      })

    }

  }

  get asset_validate_form() {

    return this.formAsset.controls;

  }

  getAllAsset() {

    this.itAssetService.getAllITAsset().subscribe((data: any) => {
      this.itAssetMaster = data.responseDto;
    })

  }

  editCommonDrive(input) {

    this.commonDriveForm.patchValue(input);

    console.log(this.commonDriveForm.value)

  }

  addAsset() {

    if (this.formAsset.valid) {

      this.assetRequestDetails.push(this.formAsset.value);

      this.formAsset.reset();

      this.formAsset = this.fb.group({

        id: [''],
        assetType: ['', [Validators.required]],
        assetId: ['', [Validators.required]],
        serialNo: ['', [Validators.required]],
        make: ['', [Validators.required]],
        model: ['', [Validators.required]],
        macAddress:[''],
        dateOfIssue: [],
        action: [AppConstants.NEW]
  
      })

      for (let name in this.formAsset.controls) {
        this.formAsset.controls[name].setErrors(null);
      }

    }

  }

  removeAsset(index, val) {

    this.assetRequestDetails.splice(index, 1);

  }

  getAssetIdList(val) {

    let req = { "assetType": val };

    this.itAssetMappingService.getAllITAssetbyAssetType(req).subscribe((data: any) => {

      this.assetIdList = data.responseDto;

    })

  }


  getAssetDetailsByAssetId(val) {

    let req = { "assetId": val };

    this.itAssetMappingService.getAssetDetailsByAssetId(req).subscribe((data: any) => {

      this.assetIdDetails = data.responseDto[0];

      this.formAsset.patchValue(data.responseDto[0]);

    })

  }


  viewCategory(category) {

    if (category === 'application') {

      this.application = true;

      this.assetDetails = false;

    } else {

      this.application = false;

      this.assetDetails = true;

    }


  }

  checkroleName(role) {

    // return this.roleManagementDtos.findIndex(x => x.roleName == role);

    return this.roleManagementDtos.indexOf(role);

  }

  checkroleNameEdit(role) {

    // return this.roleManagementDtos.findIndex(x => x.roleName == role);

    return this.roleManagementDtosEdit.indexOf(role);

  }

  addApp() {

    if (this.applicationForm.valid) {

      let appvalue = this.applicationForm.value;

      if (appvalue.id != '' && appvalue.id != null) {

        let idex = this.selectedApplication.findIndex(x => x.id == appvalue.id);

        this.selectedApplication[idex] = appvalue;

        // console.log(" ==> " + idex);

      } else {

        let idex = this.selectedApplication.findIndex(x => x.applicationName == appvalue.applicationName && x.roleName == appvalue.roleName);

        if (idex != -1) {

          Swal.fire('', 'Already Exists', 'warning');

        } else {

          this.selectedApplication.push(this.applicationForm.value);

        }


        for (let name in this.applicationForm.controls) {
          this.applicationForm.controls[name].setErrors(null);
        }

      }

    }

  }

  remove(index) {

    // this.app.removeAt(index);

    this.selectedApplication.splice(index, 1);

  }

  showForm() {

    this.editEmpFormApp = false;

    this.breadCrumbleft = "Employee Creation";

    this.getMappedApplicationList();

    this.formDeatils.reset();

    this.formDeatils.patchValue({ action: AppConstants.NEW })

    this.title = "Add / Edit Employee";

    this.form = true;
    this.tableGrid = false;

    this.viewEmployee = true;

    this.addEditView = true;
    this.nonEditView = false;

    this.EditView = false;

    this.readOnly = false;

  }

  showGrid() {

    this.breadCrumbleft = "Employee Master";

    this.editEmpFormApp = false;

    this.getAllEmployee();

    this.title = "Employee Master";

    this.form = false;
    this.tableGrid = true;
    this.viewEmployee = false;

    this.addEditView = false;
    this.nonEditView = false;


  }




  getAllEmployee() {

    this.dataTableService.dataTableDestory();

    this.employeeService.getAllEmployee().subscribe((data: any) => {

    this.employeeList = data.responseDto;

    if(this.employeeList.length>0){

    }else{

      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Total No. of  '+this.employeeList.length+' Data',
      })
  }

    this.dataTableService.dataTableReinitalize();

    })
    this.empSearchForm = this.fb.group({

      empId: '',
      empName: '',
      branchName: '',
      department: '',
      status: '',

    });

  }



  getEmpById(id) {

    let req = { empId: id };

    this.employeeService.getEmpById(req).subscribe((data: any) => {
      let res = data.responseDto[0];

      this.formDeatils.patchValue({
        reportBranchCode: res.branchCode,
        reportPersonName: res.empName,
        reportBranchName: res.branchName,
      })

    })

  }

  getEmpDetailsAfterUpdate(input) {

    let req = { empId: input };

    this.employeeService.getEmpById(req).subscribe((data: any) => {

      this.selectedApplication = data.responseDto[0].appDetailsDto;

      this.assetRequestDetails = data.responseDto[0].itAssetDto;

      this.commonDriveList = data.responseDto[0].commonDriveMappingDtos;

      this.reportsDashboardMappingList = data.responseDto[0].reportDashboardMappingDtos;

      // console.log("role Edit==> " + JSON.stringify(this.mappedRoleList));

      this.formDeatils.patchValue(
        data.responseDto[0]
      );

      this.formDeatils.patchValue({ action: AppConstants.EDIT })

    })

  }

  viewEmpDetailsById(input) {

    let req = { empId: input };

    this.employeeService.getEmpById(req).subscribe((data: any) => {

      // console.log("Response Data: "+data.responseDto[0]);

      this.reportsDashboardMappingList = data.responseDto[0].reportDashboardMappingDtos;

      this.commonDriveList = data.responseDto[0].commonDriveMappingDtos;

      // console.log(this.commonDriveList)

      this.empDetails = data.responseDto[0];

      this.tableGrid = false;

      this.viewEmployee = true;

      this.nonEditView = true;

      this.addEditView = false;

      this.EditView = true;

    })

  }

  save(formStatus) {
    
    let res: Boolean = formStatus;

    if (res) {

      this.employeeService.saveEmployee(this.formDeatils.value).subscribe((data) => {
     
        if (data['status'] == AppConstants.SUCCESS) {

          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {

              this.getAllBranch();
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


  getMappedApplicationList() {

    this.appRoleMappingService.getMappedApplicationList().subscribe((data: any) => {
      this.mappedApplicationList = data.responseDto;
    })

  }

  getRoleByApplicationCode(code) {

    if(this.applicationForm.value.applicationCode!="" && this.applicationForm.value.applicationCode!=null){

    let req = [{ applicationCode: code }];

    this.appRoleMappingService.getRoleByApplication(req).subscribe((data: any) => {
      this.mappedRoleList = data.responseDto;

      // console.log(JSON.stringify(this.mappedRoleList));

    })
  }

  }

  getRoleByApplicationCodeEdit(input) {

    this.applicationForm.patchValue({ applicationName: input.applicationName, applicationCode: input.applicationCode });

    this.getRoleByApplicationCode(input.applicationCode);

    this.roleManagementDtosEdit = input.roleName.split(",");

  }

  addRole(input, e) {

    let idx = this.checkroleName(input.roleName)

    if (idx != -1) {

      this.roleManagementDtos.splice(idx, 1);

    } else {

      // let req = {
      //   roleName: input.roleName,
      //   roleCode: input.roleCode
      // };

      this.roleManagementDtos.push(input.roleName);

    }

  }

  addRoleEdit(input, e) {

    let idx = this.checkroleNameEdit(input.roleName)

    if (idx != -1) {

      this.roleManagementDtosEdit.splice(idx, 1);

    } else {

      this.roleManagementDtosEdit.push(input.roleName);

    }

  }

  map_app_role_update() {

    let req = {
      action: AppConstants.EDIT,
      empId: this.formDeatils.get('empId').value,
      applicationName: this.applicationForm.get('applicationName').value,
      applicationCode: this.applicationForm.get('applicationCode').value,
      roleManagementDtos: this.roleManagementDtosEdit
    }

    this.employeeService.mapEmpApplicationAndRoles(req).subscribe((data: any) => {

      if (data.status == AppConstants.SUCCESS) {

        Swal.fire('', 'Updated Successfully', 'success').then((result) => {
          if (result.isConfirmed) {

            this.closeAddExpenseModal.nativeElement.click();

            this.getEmpDetailsAfterUpdate(this.formDeatils.get('empId').value);

          } else if (result.isDenied) {

          }
        });

      }
      else {
        Swal.fire('', data.exceptionMsg, 'warning');
      }

    })

  }

  map_app_role() {

    let req = {
      action: AppConstants.NEW,
      empId: this.formDeatils.get('empId').value,
      applicationName: this.applicationForm.get('applicationName').value,
      applicationCode: this.applicationForm.get('applicationCode').value,
      roleManagementDtos: this.roleManagementDtos
    }

    this.employeeService.mapEmpApplicationAndRoles(req).subscribe((data: any) => {

      if (data.status == AppConstants.SUCCESS) {

        Swal.fire('', 'Added Successfully', 'success').then((result) => {
          if (result.isConfirmed) {

            this.closeAddExpenseModal.nativeElement.click();

            this.getEmpDetailsAfterUpdate(this.formDeatils.get('empId').value);

          } else if (result.isDenied) {

          }
        });

      }
      else {
        Swal.fire('', data.exceptionMsg, 'warning');
      }

    })

  }

  getBranchNameByCode(name) {

    this.formDeatils.patchValue({ branchName: name });

    // this.branchService.getBranchDetailsByCode(req).subscribe((data: any) => {
    //   this.mappedRoleList = data.responseDto;
    // })

  }


  editEmp(input) {
    
    this.editEmpFormApp = false;

    // console.log("Inn==> " + JSON.stringify(input));

    console.log(input)

    let req = { 
                empId: input.empId ,
           ownerempId: this.commonDriveForm.get('ownerempId').value       
    };

    this.employeeService.getEmpById(req).subscribe((data: any) => {

      this.selectedApplication = data.responseDto[0].appDetailsDto;

      this.assetRequestDetails = data.responseDto[0].itAssetDto;

      this.commonDriveList = data.responseDto[0].commonDriveMappingDtos;

      // console.log(this.commonDriveList)

      this.reportsDashboardMappingList = data.responseDto[0].reportDashboardMappingDtos;      

      // console.log("role Edit==> " + JSON.stringify(this.mappedRoleList));

      this.formDeatils.patchValue(
        data.responseDto[0]
      );


      this.formDeatils.patchValue({ action: AppConstants.EDIT })

    })

    this.showForm();

    this.viewEmployee = true;

    this.addEditView = true;

    this.EditView = true;

    this.readOnly = true;

  }


  searchEmployee() {

    if(this.empSearchForm.value.empName=="" && this.empSearchForm.value.empId=="" && 
     this.empSearchForm.value.status=="" && this.empSearchForm.value.department==""){

      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.empSearchForm.valid) { 

      this.dataTableService.dataTableDestory();

      this.employeeService.searchEmployee(this.empSearchForm.value).subscribe((data: any) => {

      this.employeeList = data.responseDto;

      if(this.employeeList.length>0){

      }else{
  
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Total No. of  '+this.employeeList.length+' Data',
        })
    }
      

      this.dataTableService.dataTableReinitalize();

    })
  }
  }

  }

  searchEmployeeReset() {

    this.empSearchForm.reset();

    this.getAllEmployee();

  }

  editApp(item) {

    console.log(item);

    this.getRoleByApplicationCode(item.applicationCode);

    this.applicationForm.patchValue(item);

  }


  getAllReportDashboard() {

    this.reportDashboardService.getAllReportsDashboard().subscribe((data: any) => {

      this.reportsDashboardMasterList = data.responseDto;

    })

  }

  mapReportToEmp() {

    if (this.cliqViewReportForm.valid) {

      this.cliqViewReportForm.patchValue({ empId: this.formDeatils.get('empId').value });

      this.reportDashboardService.saveReportsDashboard(this.cliqViewReportForm.value).subscribe((data: any) => {

        this.getEmpMappedReportsDetails();

      })

    }

  }

  getEmpMappedReportsDetails() {

    let req = { empId: this.formDeatils.get('empId').value };

    this.reportDashboardService.getEmpReportsDashboard(req).subscribe((data: any) => {

      this.reportsDashboardMappingList = data.responseDto;

    })

  }
  getAllData(){
    
    if(this.empSearchForm.value.empName=="" && this.empSearchForm.value.empId=="" && 
     this.empSearchForm.value.status=="" && this.empSearchForm.value.department==""){

      this.dataTableService.dataTableDestory();

      this.getAllDepartment();
      this.getAllEmployee();
      
    }

  }

 omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}


getAllCommonDrivePath(val) {
  
   this.commonDriveService.getCommonDriveDetailsByPath(val).subscribe((data: any) => {
    
      console.log(data.responseObject)
      let commonDriveForm= data.responseObject;

      // console.log(commonDriveForm)
 
      this.commonDriveForm.patchValue({
        objectName : commonDriveForm.objectName,
        ouName : commonDriveForm.ouName,
        empName: commonDriveForm.empName,
        ownerempId: commonDriveForm.ownerempId,
    
      })
 
    })
  }
}
