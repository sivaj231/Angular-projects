import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RoleService } from "../../service/role.service";
import swal from 'sweetalert2';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dropdownSettings: any;
  roleData: any;
  roleForm: FormGroup;
  submitted: boolean;
  minFromDate: Date;
  minToDate: Date;
  roleDto:any;
  disable:Boolean = false;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private roleService: RoleService
  ) {
    this.setFromDate(new Date());
   }
   setFromDate(fromDate) {
    this.minFromDate = fromDate;
    // this.minFromDate.setDate(this.minFromDate.getDate());
  }
  //set to date
  setToDate(fromDate) {
    this.minToDate = fromDate;
    // this.minToDate.setDate(this.minToDate.getDate());
  }

  contentEdit(){
    this.roleForm.enable();
    this.disable = true;
  }

  cancelEdit() {
    this.roleForm.disable();
    this.disable = false;
    var id = (<HTMLInputElement>document.getElementById("id")).value;
    if (id != null && id != '') {
      this.getRoleById(id);
    }
  }

  ngOnInit(): void {
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.roleForm = this.formBuilder.group({
      id: new FormControl(''),
      roleCode: new FormControl('', [Validators.required]),
      roleName: new FormControl('', [Validators.required]),
      effectiveStartDate: new FormControl('', [Validators.required]),
      effectiveEndDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.roleForm.disable();
    

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
    };  
    this.viewRole();
  }

  
  get f() { return this.roleForm.controls; }

  display = "none";

  openModal(id) {
    this.display = "block";
    this.getRoleById(id);
  }
  onCloseHandled() {
    this.roleForm.reset();
    this.roleForm.disable();
    this.display = "none";
    this.disable = false;
  }


  getRoleById(id) {
    this.spinner.show();
    this.roleService.viewRoleById(id).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status = 'SUCCESS') {
          this.roleDto = data.responseData;
          var uiStartDate = this.roleDto.effectiveStartDate.split("/");
          var uiEndDate = this.roleDto.effectiveEndDate.split("/");
          this.roleForm.patchValue({
            id: this.roleDto.id,
            roleCode: this.roleDto.roleCode,
            roleName: this.roleDto.roleName,
            effectiveStartDate: new Date(uiStartDate[1] + '/' + uiStartDate[0] + '/' + uiStartDate[2]),
            effectiveEndDate: new Date(uiEndDate[1] + '/' + uiEndDate[0] + '/' + uiEndDate[2]),
            status: this.roleDto.status,
          })
          this.setFromDate(new Date(uiStartDate[1] + '/' + uiStartDate[0] + '/' + uiStartDate[2]));
        }
      }

    },
    err => {

    })

  }

  viewRole() {
    this.spinner.show();
    this.roleService.viewRole().subscribe(data => {
      if (data.status == 'SUCCESS') {
        this.spinner.hide();
        this.roleData = data.responseData;
        this.rerender();
      }
    },
      err => {
        this.spinner.hide();
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  updateRole(formValue){
    this.submitted=true;
    if (this.roleForm.invalid) {
      return;
    }
    let roleDto = {
      id:formValue.id,
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
              text: 'Role Updated Successfully!'
            }).then((result) => {
              if (result.value) {
              console.log(this.router.url);
              this.router.navigateByUrl(this.router.url);
              }
            })       
        }
      }
    },
    err=>{
      this.spinner.hide();
    });
  }


  createRole() {
    this.router.navigateByUrl("/createRole");
  }

}
