import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { TaskService } from "../../service/task.service";
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Router } from "@angular/router";


@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  year = [];
  show = false;
  submitted = false;
  globalSearchForm: FormGroup
  taskData: [];
  type='GLOBAL_SEARCH';
  constructor(
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService

  ) { }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.year.push((new Date()).getFullYear());
    this.year.push((new Date()).getFullYear() - 1);

    this.globalSearchForm = this.formBuilder.group({
      searchType: new FormControl('', [Validators.required]),
      searchValue: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required])
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      //scrollX:true
    };
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
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

  get f() { return this.globalSearchForm.controls; }


  globalSearch(formValues) {
    this.submitted = true;
    if (this.globalSearchForm.invalid) {
      return;
    }
    this.show = true;
    this.spinner.show();
    this.taskService.globalSearch(formValues.searchType, formValues.searchValue, formValues.year).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == 'SUCCESS') {
          this.taskData = data.responseData;
          this.rerender();
        } else if (data.status == 'NO_DATA') {
          this.taskData = [];
          this.rerender();
        }
      }
    },
      err => {
        this.spinner.hide();
        swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error in processing data!'
        })
      });

  }

  policyDetails(taskId, businessType){
    if(businessType=='HEALTH'){
      this.router.navigate(['/policyDetails',taskId, this.type]);
    }else if(businessType == 'MOTOR'){
      this.router.navigate(['/policyDetailsMotor',taskId, this.type]);
    }
  }

}
