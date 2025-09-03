import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TaskService } from "../../service/task.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from '@angular/common';
import { SharedService } from "../../service/shared.service";



export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 30,
    showMeridian: true,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds'
  });
}

@Component({
  selector: 'tc-update',
  templateUrl: './tc-update.component.html',
  styleUrls: ['./tc-update.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class TcUpdateComponent implements OnInit {
  tcUpdateForm: FormGroup;
  dispositionArr: any;
  subDispositionArr : any;
  submitted: boolean = false;
  minFromDate;
  taskId = '';
  showReminderDate: Boolean = false;
  showReminderTime: Boolean = false;
  minTime: Date = new Date();
  maxTime: Date = new Date();
  currentDate: Date;
  selected: any = false;
  mobileNum = '';
  roles = '';
  //mobile='';
  //email = '';
  constructor(

    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private sharedService: SharedService
  ) {
    this.minTime.setHours(8);
    this.maxTime.setHours(19);
    this.minTime.setMinutes(0);
    this.maxTime.setMinutes(60);
    //this.maxTime.setMinutes(0);
  }

  ngOnInit(): void {
    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if (data) {
          this.roles = data.userDetails.userRoles[0];
        }
      });
    }

    let interval = 30 * 60 * 1000;
    this.currentDate = new Date(Math.ceil(new Date().getTime() / interval) * interval);


    this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;

    this.tcUpdateForm = this.formBuilder.group({
      dispositions: new FormControl('', [Validators.required]),
      subDispositions: new FormControl('', [Validators.required]),
      remarks: new FormControl(''),
      reminderDate: new FormControl(''),
      myTime: new FormControl(this.currentDate)
    });
    this.setFromDate();
    this.getDispositionList();
    //this.dispositionArr = [];
  }

  get f() { return this.tcUpdateForm.controls; }

  getDispositionList() {
    this.taskService.getDisposition().subscribe(data => {
      this.dispositionArr = data.responseList;
      console.log(""+JSON.stringify(this.dispositionArr));
    },
      err => {

      });
  }

  setFromDate() {
    this.minFromDate = new Date();
    this.minFromDate.setDate(this.minFromDate.getDate());
  }

  subDisposition(disposition) {
    this.subDispositionArr = [];
    //Remove Required for Remarks
    const remarks = this.tcUpdateForm.get('remarks');
    remarks.clearValidators();
    remarks.updateValueAndValidity();
    // if (disposition == '') {
    //   this.subDispositionArr = [];
    // } else if (disposition == '1: VERIFIED') {
    //   this.subDispositionArr = ['CONTACT NUMBER MATCHED'];
    // } else if (disposition == '2: NOT CONTACTABLE') {
    //   this.subDispositionArr = ['NUMBER DOES NOT EXIST', 'NOT REACHABLE', 'SWITCHED OFF', 'OUT OF COVERAGE', 'INCOMMING BARRED', 'INVALID NUMBER', 'WRONG NUMBER', 'OTHER'];
    // } else if (disposition == '3: CALL BACK') {
    //   this.subDispositionArr = ['CALL AGAIN', 'OTHER'];
    // } else if (disposition == '4: NOT RESPONDING') {
    //   this.subDispositionArr = ['PROPOSER DIDNT PICKED THE CALL', 'OTHER'];
    // } else if (disposition == '5: ALTERNATE NUMBER PENDING VERIFICATION') {
    //   this.subDispositionArr = ['ACTIVATION LINK SENT', 'OTHER'];
    // } else if (disposition == '6: OTHER') {
    //   this.subDispositionArr = ['CUSTOMER DECLINED TO PROVIDE DETAILS', 'ACTIVATION LINK EXPIRED', 'OTHER'];
    // }

    if(disposition){
      this.taskService.getSubDisposition(disposition).subscribe(data=>{
        this.subDispositionArr = data.responseList;

      },
      err=>{

      });
    }




    //Show or hide reminder
    if (disposition == '1: VERIFIED' || disposition == '6: INVALID NUMBER' || disposition == '') {
      this.showReminderDate = false;
      this.showReminderTime = false;
      this.tcUpdateForm.get('remarks').setValue('');
      this.tcUpdateForm.get('reminderDate').setValue('');
      this.tcUpdateForm.get('myTime').setValue('');
    } else {
      this.showReminderDate = true;
    }
  }

  remarksValidation() {
    let subdispotion = this.tcUpdateForm.controls['subDispositions'].value;
    const remarks = this.tcUpdateForm.get('remarks');
    if (subdispotion == 'OTHER') {
      remarks.setValidators(Validators.required);
    } else {
      remarks.clearValidators();
    }
    remarks.updateValueAndValidity();
  }


  openTC(event: any) {
    this.selected = true;
  }
  closeTC(event: any) {
    this.selected = false;
  }

  showReminderTimeFunc(reminderDate) {
    if (reminderDate) {
      let currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy")
      reminderDate = this.datePipe.transform(reminderDate, "dd/MM/yyyy");
      if (reminderDate == currentDate) {
        //let interval = 30 * 60 * 1000;
        //this.currentDate = new Date(Math.ceil(new Date().getTime() / interval) * interval);
        //alert(this.currentDate.getHours()+''+this.currentDate.getMinutes());
        this.minTime.setHours(this.currentDate.getHours());
        this.maxTime.setHours(19);
        this.minTime.setMinutes(0);
        this.maxTime.setMinutes(this.currentDate.getMinutes());
      } else {
        this.minTime.setHours(8);
        this.maxTime.setHours(19);
        this.minTime.setMinutes(0);
        this.maxTime.setMinutes(60);
      }
      this.showReminderTime = true;
    } else {
      this.showReminderTime = false;
    }
  }

  tcUpdate(formValues) {
    this.submitted = true;
    if (this.tcUpdateForm.invalid) {
      return;
    }
    let tcUpdateDto = {
      taskId: this.taskId,
      disposition: formValues.dispositions,
      subDisposition: formValues.subDispositions,
      remarks: formValues.remarks,
      remainderDate: this.datePipe.transform(formValues.reminderDate, "dd/MM/yyyy"),
      remainderTime: this.datePipe.transform(formValues.myTime, "hh:mm a"),
      //mobileNumber:this.mobile,
      //email:this.email

    }
    this.spinner.show();
    this.taskService.tcUpdates(tcUpdateDto).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == 'SUCCESS') {
          swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Task Details Updated Successfully!',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              if (this.roles == 'ROLE_TELECALLER') {
                this.router.navigateByUrl("/myTask");
              } else {
                this.router.navigateByUrl("/exceptionalTask");
              }
            }
          })
        } else if (data.status == 'TRANSFERED') {
          swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Task Already Transfered!',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl("/myTask");
            }
          })
        }
      }
    },
      err => {
        this.spinner.hide();
      }
    );
  }



}
