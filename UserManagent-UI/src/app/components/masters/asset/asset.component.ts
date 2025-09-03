import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { AppConstants } from 'src/app/constants/AppConstants';

import { assetMaster } from "../../../services/assetMaster";
import { DataTableService } from '../../../services/dataTableService';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  assetList: any[] = [];

  title: String = "Asset Master";

  form: Boolean = false;

  formDeatils: FormGroup;

  assetSearchForm: FormGroup;
  readOnly: boolean;

  constructor(private dataTableService: DataTableService, private http: HttpClient, private fb: FormBuilder, private assetMaster: assetMaster,) {


  }

  ngOnInit(): void {

    this.formDeatils = this.fb.group({

      assetType: ['', [Validators.required]],
      status: [''],
      action: [AppConstants.NEW, [Validators.required]],

    })
    this.assetSearchForm = this.fb.group({

      assetType: [''],
      status: [''],
      action: [AppConstants.NEW, [Validators.required]],

    })

    this.getAllAsset();

  }

  get validate_form() { return this.formDeatils.controls; }

  showForm() {

    this.formDeatils.reset();

    this.formDeatils.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit Asset";

    this.form = true;

    this.tableGrid = false;

  }

  showGrid() {

    this.readOnly = false;

    this.title = "Asset Master";

    this.form = false;

    this.tableGrid = true;

    this.getAllAsset();

  }

  getAllAsset() {

    this.dataTableService.dataTableDestory();

    this.assetMaster.getAllAsset().subscribe(data => {

      this.tableGridData = data['responseDto'];

      this.assetList = data['responseDto'];

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
    this.assetSearchForm = this.fb.group({

      assetType: [''],
      status: [''],
      action: [AppConstants.NEW, [Validators.required]],

    })

  }

  save() {

    if (this.formDeatils.valid) {

      this.assetMaster.saveAsset(this.formDeatils.value).subscribe((data) => {

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


  editAsset(input) {

    this.showForm();

    this.readOnly = true;

    this.formDeatils.patchValue(
      {
        assetType: input.assetType,

        action: AppConstants.EDIT,
        status: input.status,
      }
    );

  }
//   onChanged(deviceValue) {
//     var dat = this.assetList.filter((item) => {
//       if(item.asset==deviceValue){
//         this.assetSearchForm.controls.asset.setValue(item.asset);
//       }else if(deviceValue==''){
//         this.assetSearchForm.controls.departmentName.setValue('')}});
    
// }

searchAsset(){

  if(this.assetSearchForm.value.assetType=="" && 
     this.assetSearchForm.value.status==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
      
    }
    
    else{

      if (this.assetSearchForm.valid) { 

      this.dataTableService.dataTableDestory();
      

      this.assetMaster.searchAsset(this.assetSearchForm.value).subscribe((data: any) => {

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
searchAssetReset(){

  this.assetSearchForm.reset();

  this.getAllAsset();

}
getAllData(){

  if(this.assetSearchForm.value.assetType=="" && 
   this.assetSearchForm.value.status==""){

    this.dataTableService.dataTableDestory();

    this.getAllAsset();
    
  }

}

}
