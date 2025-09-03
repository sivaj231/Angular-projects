import { EmployeeService } from './../../../services/employeeService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import { itAssetService } from "../../../services/ITAssetService";

import { itAssetMappingService } from "../../../services/itassetmappingservice";

import { assetMaster } from "../../../services/assetMaster";

import { AppConstants } from "../../../constants/AppConstants";
import { BranchDto } from '../../../services/branchDto';

@Component({
  selector: 'app-it-asset',
  templateUrl: './it-asset.component.html',
  styleUrls: ['./it-asset.component.scss']
})
export class ItAssetComponent implements OnInit {

  formDetails: FormGroup;

  empId = '';

  tableGrid: Boolean = true;

  tableGridData: BranchDto[];

  title: String = "IT Asset";

  form: Boolean = false;

  itAssetMaster = [];

  assetDetailsByEmpId = [];

  empFormDetails: any = {};

  empDetails: any = [];

  assetIdList: any[] = [];

  assetRequestDetails: any[] = [];

  assetIdDetails: any = {};

  viewAssetDetails: Boolean = false;

  constructor(private fb: FormBuilder, private itAssetService: itAssetService, private employeeService: EmployeeService, private assetMaster: assetMaster, private itAssetMappingService: itAssetMappingService) { }

  ngOnInit(): void {

    this.formDetails = this.fb.group({

      assetType: ['', [Validators.required]],
      assetId: ['', [Validators.required]],
      serialNo: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      dateOfIssue: [],
      action: [AppConstants.NEW]

    })

    this.getAllEmpAssetDetails();

  }

  get asset_validate_form() {

    return this.formDetails.controls;

  }

  addAsset() {


    if (this.formDetails.valid) {

      this.assetRequestDetails.push(this.formDetails.value);

      this.formDetails.reset();

    }


  }

  remove(index, val) {

    this.assetRequestDetails.splice(index, 1);

  }

  getAllAsset() {

    this.itAssetService.getAllITAsset().subscribe((data: any) => {
      this.itAssetMaster = data.responseDto;
    })

  }

  getAllAssetTypeMaster() {

    this.assetMaster.getAllAsset().subscribe((data: any) => {
      this.itAssetMaster = data.responseDto;
    })

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

      this.formDetails.patchValue(data.responseDto[0]);

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

  save() {

    // this.formDetails.patchValue({ empId: this.empId });

    if (this.assetRequestDetails.length > 0) {

      let req = {
        empId: this.empId,
        itassetDto: this.assetRequestDetails
      }

      this.itAssetService.save(req).subscribe((data) => {

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

    } else {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Asset',
      })
    }


  }

  getAllEmpAssetDetails() {

    this.itAssetService.getAllEmpAssetDetails().subscribe((data: any) => {
      this.tableGridData = data.responseDto;
    })

  }

  showForm() {

    this.getAllAsset();

    this.title = "Add New IT Asset";

    this.tableGrid = false;

    this.form = true;

    this.empFormDetails = [];

  }

  showGrid() {


    this.title = "Add New IT Asset";

    this.tableGrid = true;

    this.form = false;

    this.viewAssetDetails = false;

    this.getAllEmpAssetDetails();

  }

  editItAsset(item) {



  }

}
