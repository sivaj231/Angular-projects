import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from 'rxjs';
import { ApplicationDataMaintanceService } from 'src/app/services/applicationDataMaintanceService';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";
import { AppApproveService } from '../../../services/app_approve_service';
import { EmployeeService } from '../../../services/employeeService';
import { itAssetService } from "../../../services/ITAssetService";




@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  formDetails: FormGroup;
  itassetSearchForm: FormGroup;
  empId = '';

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  currentAppData: any[] = [];

  itassetList: any[] = [];

  title: String = "IT Asset";

  form: Boolean = false;

  vieweditAssetDetails: Boolean = false;

  itAssetMaster = [];

  dashboardCount = {};

  assetDetailsByEmpId = [];

  empFormDetails: any = {};

  empDetails: any = [];

  viewAssetDetails: Boolean = false;

  application: Boolean = false;

  assetDetails: Boolean = false;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  mappedRoles: any = "";

  constructor(private fb: FormBuilder, private applicationDataMaintanceService: ApplicationDataMaintanceService, private itAssetService: itAssetService, private employeeService: EmployeeService, private appApproveService: AppApproveService) { }

  ngOnInit(): void {

    this.dtOptions = {
      dom: 'rtlip',
      destroy: true,
    }

    this.itassetSearchForm = this.fb.group({

      empId: [null],
      empName: [null],
      roleName: [null],
      branchName: [null],
      status: [null]

    });


    this.formDetails = this.fb.group({

      empId: '',
      itassetDto: this.fb.array(
        [
          this.fb.group({

            assetType: '',
            assetId: '',
            dateOfIssue: '',
            action: [AppConstants.NEW]
          })


        ])

    })

    this.getAllEmployeeByReportingHead();

    this.getManagerDashBoardCount();

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  getManagerDashBoardCount() {

    this.employeeService.getManagerDashBoardCount().subscribe((data: any) => {
      // this.empFormDetails = data.responseDto[0];
      this.dashboardCount = data.responseDto[0];
    })

  }

  get app() {

    return this.formDetails.get('itassetDto') as FormArray;

  }

  addApp() {

    this.app.push(this.fb.group({

      assetType: '',
      assetId: '',
      dateOfIssue: '',
      action: [AppConstants.NEW]

    }));

  }

  remove(index) {

    this.app.removeAt(index);

  }

  getAllAsset() {


    this.itAssetService.getAllITAsset().subscribe((data: any) => {
      this.itAssetMaster = data.responseDto;
    })

  }

  getEmpById(id) {

    let req = { empId: id };

    this.employeeService.getEmpById(req).subscribe((data: any) => {
      this.empFormDetails = data.responseDto[0];
    })

  }

  viewAssetDetailsByEmpId(id) {

    let req = { empId: id };

    this.employeeService.getEmpById(req).subscribe((data: any) => {
      this.empDetails = data.responseDto[0];
      this.viewAssetDetails = true;
      this.tableGrid = false;
    })

  }
  editAssetDetails(id) {

    let req = { empId: id };

    this.employeeService.getEmpById(req).subscribe((data: any) => {
      this.empDetails = data.responseDto[0];
    })

    this.getApplicationDataCurrentQuarter(req);

    this.vieweditAssetDetails = true;

    this.tableGrid = false;

    this.form = false;

  }

  save() {

    this.formDetails.patchValue({ empId: this.empId });

    this.itAssetService.save(this.formDetails.value).subscribe((data) => {

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

      console.log("res" + JSON.stringify(data))
    });

  }

  getAllEmployeeByReportingHead() {

    this.dtOptions.destroy = true;

    this.employeeService.getAllEmployeeByReportingHead().subscribe((data: any) => {

      this.dtTrigger.next();

      this.tableGridData = data.responseDto;
    })

  }

  showForm() {

    this.getAllAsset();

    this.title = "Add New IT Asset";

    this.tableGrid = false;

    this.form = true;

    this.viewAssetDetails = false;

    this.empFormDetails = [];

    this.vieweditAssetDetails = false;

  }

  showGrid() {


    this.title = "Add New IT Asset";

    this.tableGrid = true;

    this.form = false;

    this.vieweditAssetDetails = false;

    this.viewAssetDetails = false;

    this.getAllEmployeeByReportingHead();

  }

  searchItAsset() {

    this.itAssetService.searchItAsset(this.itassetSearchForm.value).subscribe((data: any) => {

      this.tableGridData = data.responseDto;

    })

  }

  searchItAssetReset() {

    this.itassetSearchForm.reset();

    this.getAllAsset();

  }

  mapApplication() {

    this.applicationDataMaintanceService.saveAppDataMaitenance().subscribe();

  }

  confirmApp(input, index) {

    let req = { id: input.id };

    this.appApproveService.approveApp(req).subscribe((data: any) => {

      console.log(data);


      if (data.status == AppConstants.SUCCESS) {

        this.empDetails.appDataMaintenanceDtos[index].appActiveStatus = 'CONFIRMED';


        Swal.fire({
          icon: 'success',
          title: '',
          text: data['msg'],
        }).then((result) => {
          if (result.isConfirmed) {

            // this.showGrid();

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

  viewCategory(category) {

    if (category === 'application') {

      this.application = true;

      this.assetDetails = false;

    } else {

      this.application = false;

      this.assetDetails = true;

    }


  }

  viewMappedRoles(item) {

    this.mappedRoles = item.roleName;

  }

  getApplicationDataCurrentQuarter(req) {

    this.applicationDataMaintanceService.getApplicationDataCurrnetQuarter(req).subscribe((data: any) => {

      this.currentAppData = data.responseDto;

    })

  }

}