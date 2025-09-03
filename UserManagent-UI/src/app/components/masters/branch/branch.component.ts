import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataTableService } from 'src/app/services/dataTableService';
import Swal from 'sweetalert2';
import { AppConstants } from "../../../constants/AppConstants";
import { BranchDto } from '../../../services/branchDto';
import { BranchService } from "../../../services/branchService";


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  tableGrid: Boolean = true;

  tableGridData: BranchDto[];

  branchList: any[] = [];

  parentbranchList: any[] = [];

  title: String = "Branch Master";

  form: Boolean = false;

  readOnly: Boolean = false;

  formDeatils: FormGroup;

  branchSearchForm: FormGroup;

  constructor(private datatableService: DataTableService, private fb: FormBuilder, private http: HttpClient, private branchService: BranchService) {

    }

  ngOnInit(): void {

    this.branchSearchForm = this.fb.group({

      branchCode: '',
      branchName: '',
      parentBranchCode: '',
      status: '',

    });

    this.formDeatils = this.fb.group({

      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      parentBranchCode: ['',],
      status: ['',[Validators.required]],
      action: [AppConstants.NEW, Validators.required]

    })

    this.getAllBranch();
  }


  showForm() {

    this.readOnly = false;

    this.formDeatils.reset();

    this.formDeatils.patchValue({ action: AppConstants.NEW });

    this.title = "Add / Edit Branch";

    this.form = true;

    this.tableGrid = false;

  }

  showGrid() {

    this.readOnly = false;

    this.title = "Branch Master";

    this.form = false;

    this.tableGrid = true;

    this.getAllBranch();

  }

  getAllBranch() {

    this.datatableService.dataTableDestory();

    this.branchService.getAllBranch().subscribe((data: any) => {

      this.tableGridData = data.responseDto;
      this.branchList = data.responseDto;
      this.parentbranchList = data.responseDto;

      if(this.tableGridData.length>0){
    
      }else{
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Total No. of  '+this.tableGridData.length+' Data',
        })
      }

      this.datatableService.dataTableReinitalize();

    })
    this.branchSearchForm = this.fb.group({

      branchCode: [''],
      branchName: [''],
      parentBranchCode: [''],
      status: [''],

    });

  }

  get validate_form() { return this.formDeatils.controls; }

  save() {

    if (this.formDeatils.valid) {

      this.http.post(AppConstants.SAVE_BRANCH, this.formDeatils.value).subscribe((data) => {

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


  editBranch(input) {

    this.showForm();

    this.readOnly = true;

    this.formDeatils.patchValue(
      {
        branchCode: input.branchCode,
        branchName: input.branchName,
        parentBranchCode: input.parentBranchCode,
        action: AppConstants.EDIT,
        status: input.status,
      }
    );

  }
  searchBranch() {

    if(this.branchSearchForm.value.branchCode=="" && this.branchSearchForm.value.branchName=="" && 
     this.branchSearchForm.value.parentBranchCode=="" && this.branchSearchForm.value.status==""){
      
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please Select Minimum One Option.',
      })
     } else{
      
        if (this.branchSearchForm.valid) { 
        
          this.datatableService.dataTableDestory();

          this.branchService.searchBranch(this.branchSearchForm.value).subscribe((data: any) => {

          this.tableGridData = data.responseDto;

          if(this.tableGridData.length>0){
            
          }else{
            Swal.fire({
              icon: 'error',
              title: '',
              text: 'Total No. of  '+this.tableGridData.length+' Data',
            })
    }

    this.datatableService.dataTableReinitalize();

    })
  }
  }
}
     
  searchBranchReset() {

    this.branchSearchForm.reset();

    this.getAllBranch();

  }
  getAllData(){

    if(this.branchSearchForm.value.branchCode=="" && this.branchSearchForm.value.branchName=="" && 
     this.branchSearchForm.value.parentBranchCode=="" && this.branchSearchForm.value.status==""){

      this.datatableService.dataTableDestory();

      this.getAllBranch();
    }

  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}
