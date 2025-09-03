import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TaskService } from "../../service/task.service";
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";


@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: any = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  dtTrigger3: Subject<any> = new Subject<any>();
  dtTrigger4: Subject<any> = new Subject<any>();
  dtTrigger5: Subject<any> = new Subject<any>();
  dtTrigger6: Subject<any> = new Subject<any>();
  dtTrigger7: Subject<any> = new Subject<any>();
  transactionType : String = 'NB'; 
  taskList : any;
  freshList : [] ;
  verifiedList : [];
  notContactable : [];
  notRespondingList : [];
  callBackList : [];
  alternateNumList : [];
  alternateNumVerList : [];
  otherList : [];
  type= "POLICY_DETAILS";

  constructor(
    private taskService : TaskService,
    private spinner: NgxSpinnerService,
    private router : Router,
  ) { }
  
  ngAfterViewInit(): void {
    this.dtTrigger1.next();
    this.dtTrigger2.next();
    this.dtTrigger3.next();
    this.dtTrigger4.next();
    this.dtTrigger5.next();
    this.dtTrigger6.next();
    this.dtTrigger7.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
    this.dtTrigger4.unsubscribe();
    this.dtTrigger5.unsubscribe();
    this.dtTrigger6.unsubscribe();
    this.dtTrigger7.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
      destroy:true
    }; 
    this.bindData(this.transactionType);
  }

  update(){
    this.ngOnInit();
  }

  bindData(transactionType) {
    this.spinner.show();
    this.taskService.myTask(transactionType).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == 'success') {
          if(data.errorMessage == 'taskNotAvailableToAllocate'){
            swal.fire({
              icon: 'error',
              title: 'No Task!',
              text: 'No Task Available to Allocate!'
            })
          }
          this.freshList = [];
          this.verifiedList = [];
          this.notContactable = [];
          this.notRespondingList = [];
          this.callBackList = [];
          this.alternateNumList = [];
          this.alternateNumVerList = [];
          this.otherList = [];
          this.taskList = data.responseData;
          this.bindDataToEachDisposition(this.taskList);
          this.rerender();
        }else if(data.status == 'taskNotAvailable'){
          if(data.errorMessage == 'taskNotAvailableToAllocate'){
            swal.fire({
              icon: 'error',
              title: 'No Task!',
              text: 'No Task Available to Allocate!'
            })
          }
          this.freshList = [];
          this.verifiedList = [];
          this.notContactable = [];
          this.notRespondingList = [];
          this.callBackList = [];
          this.alternateNumList = [];
          this.alternateNumVerList=[];
          this.otherList = [];
          this.rerender();
        }
      }
    },
      err => {
        this.spinner.hide();
      })
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if (dtElement.dtInstance){
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      }
        
    });
      this.dtTrigger1.next();
      this.dtTrigger2.next();
      this.dtTrigger3.next();
      this.dtTrigger4.next();
      this.dtTrigger5.next();
      this.dtTrigger6.next();
      this.dtTrigger7.next();
  }

  bindDataToEachDisposition(taskList){
    if(taskList['FRESH']){
      this.freshList = taskList['FRESH'];
    }
    if(taskList['NOT CONTACTABLE']){
      this.notContactable = taskList['NOT CONTACTABLE'];
    }
    if(taskList['CALL BACK']){
      this.callBackList = taskList['CALL BACK'];
    }
    if(taskList['NOT RESPONDING']){
      this.notRespondingList = taskList['NOT RESPONDING'];
    }
    if(taskList['ALTERNATE NUMBER PENDING VERIFICATION']){
      this.alternateNumList = taskList['ALTERNATE NUMBER PENDING VERIFICATION'];
    }
    if(taskList['ALTERNATE NUMBER VERIFIED']){
      this.alternateNumVerList = taskList['ALTERNATE NUMBER VERIFIED'];
    }
    if(taskList['OTHER']){
      this.otherList = taskList['OTHER'];
    }
    if(taskList['VERIFIED']){
      this.verifiedList = taskList['VERIFIED'];
    }
  }

  policyDetails(taskId, businessType){
    if(businessType=='HEALTH'){
      this.router.navigate(['/policyDetails',taskId, this.type]);
    }else if(businessType == 'MOTOR'){
      this.router.navigate(['/policyDetailsMotor',taskId, this.type]);
    }
  }

}
