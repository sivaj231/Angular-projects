import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../../constants/AppConstants';
import { CommonDriveService } from '../../../services/commonDriveService';
import { DataTableService } from '../../../services/dataTableService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-common-drive',
  templateUrl: './common-drive.component.html',
  styleUrls: ['./common-drive.component.scss']
})
export class CommonDriveComponent implements OnInit {

  commonDriveList: any[] = [];

  tableGrid: Boolean = true;

  addEditForm: Boolean = false;

  commonDriveForm: FormGroup;
  empDataList: any;

  constructor(private dataTableService: DataTableService, private commonDriveService: CommonDriveService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.commonDriveForm = this.fb.group({

      id: ['', []],
      path: ['', [Validators.required]],
      objectName:['',[Validators.required]],
      ouName:['',[Validators.required]],
      ownerempId:['',[Validators.required]],
      ownerEmpName:['',[Validators.required]],
      ownerEmpDepartment:['',[Validators.required]],
      status: ['', []],
      action: [AppConstants.NEW, []],

    })


    this.getAllCommonDriveList();

    this.getAllEmpList();

  }
  getAllEmpList() {
    this.commonDriveService.getAllEmp().subscribe((data: any) => {

      this.empDataList = data.responseDto;

      // console.log(this.empDataList)

    })
  }

  getAllCommonDriveList() {

    this.dataTableService.dataTableDestory();

    this.commonDriveService.getAllCommonDrive().subscribe((data: any) => {

      this.commonDriveList = data.responseDto;

      // console.log(this.commonDriveList)

      this.dataTableService.dataTableReinitalize();

    })

  }

  get validate_form() {
    return this.commonDriveForm.controls;
  }

  editCommonDrive(input) {

    this.addEditForm = true;

    this.tableGrid = false;

    console.log(input)

    this.commonDriveForm.patchValue(input);

    this.commonDriveForm.patchValue({ action: AppConstants.EDIT });

  }

  saveCommonDrive() {

    if (this.commonDriveForm.valid) {

      this.commonDriveService.saveCommonDrive(this.commonDriveForm.value).subscribe((data: any) => {

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

      })

    }

  }

  showForm() {

    this.commonDriveForm.reset();

    this.commonDriveForm.patchValue({ action: AppConstants.NEW });

    this.addEditForm = true;

    this.tableGrid = false;

  }

  showGrid() {

    this.addEditForm = false;

    this.tableGrid = true;

    this.getAllCommonDriveList();

  }
  getAllEmpDetails(deviceValue){
    var dat = this.empDataList.filter((item) => {
      if(item.empId==deviceValue || item.empName==deviceValue){
            this.commonDriveForm.controls.ownerempId.setValue(item.empId);
            this.commonDriveForm.controls.ownerEmpName.setValue(item.empName);
            this.commonDriveForm.controls.ownerEmpDepartment.setValue(item.department);
      }else if(deviceValue==''){
            this.commonDriveForm.controls.userName.setValue('')}});
   
  }

}
