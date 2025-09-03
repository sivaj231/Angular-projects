import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { TaskService } from "../../service/task.service";
import { UserService } from "../../service/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-view-exceptional-task',
  templateUrl: './view-exceptional-task.component.html',
  styleUrls: ['./view-exceptional-task.component.css']
})
export class ViewExceptionalTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  taskData: any;
  type= "POLICY_DETAILS";

  constructor(
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
    };
    this.getExceptionalTask();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getExceptionalTask(){
    this.spinner.show();
    this.taskService.getExceptionAssignedTask().subscribe(data=>{
      this.spinner.hide();
      if(data){
        if(data.status=='SUCCESS'){
          this.taskData = data.responseData;
          this.rerender();
        }
      }
    },
    err=>{
      this.spinner.hide();
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
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
