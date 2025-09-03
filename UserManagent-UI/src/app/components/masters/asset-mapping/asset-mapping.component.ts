import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


import { AppConstants } from "../../../constants/AppConstants";


import { assetMaster } from '../../../services/assetMaster';
import { itAssetMappingService } from '../../../services/itassetmappingservice';
import { DataTableService } from '../../../services/dataTableService';

@Component({
  selector: 'app-asset-mapping',
  templateUrl: './asset-mapping.component.html',
  styleUrls: ['./asset-mapping.component.scss']
})

export class AssetMappingComponent implements OnInit {

  formDetails: FormGroup;

  empId = '';

  tableGrid: Boolean = true;

  tableGridData: any[] = [];

  assetMapList: any[] = [];

  title: String = "IT Asset";

  form: Boolean = false;

  itAssetMaster = [];

  assetDetailsByEmpId = [];

  empFormDetails: any = {};

  empDetails: any = [];

  viewAssetDetails: Boolean = false;
  change: boolean;
  submitted: boolean;

  constructor(private dataTableService: DataTableService, private fb: FormBuilder, private itAssetMappingService: itAssetMappingService, private assetmaster: assetMaster,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.formDetails = this.fb.group({

      itassetDto: this.fb.array(
        [
          this.fb.group({

            id:[''],
            assetType: ['', [Validators.required]],
            assetId: ['', [Validators.required]],
            serialNo: ['', [Validators.required]],
            make: ['', [Validators.required]],
            model: ['', [Validators.required]],
            status: [''],
            macAddress:[''],
            action: [AppConstants.NEW],

          })


        ])



    })

    this.getAllITAssetMap();

    this.getAllAsset();

  }

  get app() {

    return this.formDetails.get('itassetDto') as FormArray;

  }

  addApp() {

    this.app.push(this.fb.group({

      assetType: ['',[Validators.required]],
      assetId: ['',[Validators.required]],
      serialNo: ['',[Validators.required]],
      make: ['',[Validators.required]],
      model: ['',[Validators.required]],
      status: ['',],
      macAddress:[''],
      action: [AppConstants.NEW]

    }));

  }

  remove(index) {
    if(this.app.length>1){
    this.app.removeAt(index);
    }

  }



  showForm() {

    this.formDetails.reset();

    this.app.at(0).patchValue({ action: AppConstants.NEW});

    this.change = true

    this.title = "Add / Edit Designation";

    this.form = true;

    this.tableGrid = false;

  }

  get validate_form() {
    return this.formDetails.controls;
  }

  editAssetMappping(val) {

    for(var i = 1; i <= this.app.length; i++){
      this.app.removeAt(i); 
     
    }if(this.app.length==1){
      this.change = false;

      this.form = true;
  
      this.tableGrid = false;
  
      this.app.at(0).patchValue(val);
  
      this.app.at(0).patchValue({ action: 'EDIT' });     
      
    }else{
      this.app.removeAt(i);
    }
    
    

  }

  showGrid() {
    if(this.app.length>1){
      for(var i=0;i<this.app.length;i++){
        this.app.removeAt(i);
      }
    }


    this.title = "Designation Master";

    this.form = false;

    this.tableGrid = true;

    this.getAllITAssetMap();

  }

  getAllITAssetMap() {

    this.dataTableService.dataTableDestory();

    this.itAssetMappingService.getAllITAssetMap().subscribe(data => {

    this.tableGridData = data['responseDto'];

    this.dataTableService.dataTableReinitalize();

    })

  }
  getAllAsset() {

    this.assetmaster.getAllAsset().subscribe((data: any) => {
      this.itAssetMaster = data['responseDto'];
    })

  }
  save() {
    // console.log(this.formDetails.value);
    this.submitted=true;

    if (this.formDetails.valid) {


      this.itAssetMappingService.saveITAssetMap(this.formDetails.value.itassetDto).subscribe((data) => {

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


}
