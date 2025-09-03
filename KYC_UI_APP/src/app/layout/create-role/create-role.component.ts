import { Component, OnInit,OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; 
import { DatePipe } from '@angular/common';
import {RoleService} from "../../service/role.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  
  roleForm:FormGroup;
  submitted: boolean;
  minFromDate: Date;
  minToDate: Date;

  constructor(
    private router : Router,
    private spinner: NgxSpinnerService,
    private formBuilder : FormBuilder,
    private datePipe : DatePipe,
    private roleService :RoleService
  ) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      roleCode: new FormControl('', [Validators.required]),
      roleName: new FormControl('', [Validators.required]),
      effectiveStartDate: new FormControl('', [Validators.required]),
      effectiveEndDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.setFromDate();
  }
  get f() { return this.roleForm.controls; }


  setFromDate() {
    this.minFromDate = new Date();
    this.minFromDate.setDate(this.minFromDate.getDate());
  }
  
  setToDate(fromDate) {
    this.minToDate = fromDate;
    this.minToDate.setDate(this.minToDate.getDate());
  }

  updateRole(formValue){
    this.submitted=true;
    if (this.roleForm.invalid) {
      return;
    }
    let roleDto = {
      roleCode:formValue.roleCode,
      roleName:formValue.roleName,
      status:formValue.status,
	    effectiveStartDate:this.datePipe.transform(formValue.effectiveStartDate, "dd/MM/yyyy"),
      effectiveEndDate:this.datePipe.transform(formValue.effectiveEndDate, "dd/MM/yyyy")
    }
    this.spinner.show();
    this.roleService.saveUser(roleDto).subscribe(data=>{
      this.spinner.hide();
      if(data){
        if(data.status=='SUCCESS'){
            swal.fire({
              icon: 'success',
              title: 'OK!',
              text: 'Role Added Successfully!'
            })
            this.roleForm.reset();
            this.submitted = false;         
        }
      }
    },
    err=>{
      this.spinner.hide();
    });
  }
  

}
