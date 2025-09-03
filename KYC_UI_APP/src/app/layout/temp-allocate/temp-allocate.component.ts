import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UserService } from "../../service/user.service";
import { TaskService } from "../../service/task.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-temp-allocate',
  templateUrl: './temp-allocate.component.html',
  styleUrls: ['./temp-allocate.component.css']
})
export class TempAllocateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  taskData: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  tempAllocateForm: FormGroup;
  event_type: any
  branches = [];
  channels = [];
  overAllBranches = [];
  teleCallers = [];
  submitted = false;
  show = false;
  toTeleCallers = [];
  showGeneralBranch: Boolean = false;
  minFromDate: Date;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private taskService: TaskService,
    private userService: UserService
  ) { }
  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.tempAllocateForm = this.formBuilder.group({
      selectedChannel: new FormControl(null, [Validators.required]),
      selectedBranch: new FormControl(null, [Validators.required]),
      teleCaller: new FormControl([], [Validators.required]),
      branchTransfer: new FormControl('', [Validators.required]),
      transferBranch: new FormControl(null)
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
    };
    this.getChannelAndBranchList();
    this.setFromDate();
  }

  setFromDate() {
    this.minFromDate = new Date();
    this.minFromDate.setDate(this.minFromDate.getDate());
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

  get f() {
    //alert(this.reallocateForm.controls.selectedChannel); 
    return this.tempAllocateForm.controls;
  }

  getChannelAndBranchList() {
    this.spinner.show();
    this.userService.getUserMappedChannelAndBranchList().subscribe(data => {
      this.spinner.hide();
      if (data.status == 'SUCCESS') {
        this.branches = data.responseData.branchList;
        this.channels = data.responseData.channelList;
        this.overAllBranches = data.responseData.totalBranchList;
      }
    },
      err => {

      })

  }

  branchTransferToggle(value) {
    const transferBranch = this.tempAllocateForm.get('transferBranch');
    if (value == 'YES') {
      this.showGeneralBranch = true;
      transferBranch.setValidators(Validators.required);
    } else {
      transferBranch.clearValidators();
      this.showGeneralBranch = false;
    }
    transferBranch.updateValueAndValidity();
  }

  getTeleCallers() {
    let channel = this.tempAllocateForm.get('selectedChannel').value;
    let branch = this.tempAllocateForm.get('selectedBranch').value;
    if (channel && branch) {
      this.event_type = [];
      this.spinner.show();
      this.userService.getTeleCallerBasedOnBranchAndChannel(channel, branch).subscribe(data => {
        this.spinner.hide();
        if (data.status == 'SUCCESS') {
          this.teleCallers = data.responseData;
        } else {
          this.teleCallers = [];
          this.event_type = [];
        }
      },
        err => {

        });
    }

  }


  checkAllCheckBox(ev) {
    this.taskData.forEach(x => x.checked = ev.target.checked)
  }

  isAllCheckBoxChecked() {
    return this.taskData.every(p => p.checked);
  }

  checkCheckBox(ev, i) {
    this.taskData[i].checked = ev.target.checked;
  }


  checkCheckBoxChecked(this) {
    console.log("" + this);
  }

  changeFunction(event, i) {
    this.taskData[i].toTeleCaller = event.target.value;
  }

  getDate(date, i) {
    let fromDate = this.datePipe.transform(date[0], "dd/MM/yyyy")
    //alert(+''+sad[1]);
    let toDate = this.datePipe.transform(date[1], "dd/MM/yyyy")

    this.taskData[i].tempFromDate = fromDate;
    this.taskData[i].tempToDate = toDate;
    // alert(fromDate+'<->'+toDate);
  }

  updateComments(event, i) {
    this.taskData[i].reasons = event.target.value;
  }

  getDetails(formValue) {
    this.submitted = true;
    if (this.tempAllocateForm.invalid) {
      return;
    }
    let taskModificationDto = {
      managerMappedChannel: formValue.selectedChannel,
      managerMappedBranch: formValue.selectedBranch,
      fromTelecaller: formValue.teleCaller,
      branchTransferFlag: formValue.branchTransfer,
      transferBranch: formValue.transferBranch
    }
    //alert(JSON.stringify(taskModificationDto));
    this.spinner.show();
    this.taskService.getTaksFortempAllocation(taskModificationDto).subscribe(data => {
      this.spinner.hide();
      if (data.status == 'SUCCESS') {
        this.show = true;
        this.taskData = data.responseData;
        this.toTeleCallers = data.responseList;
        this.rerender();
      } else if (data.status == 'NO_DATA') {
        this.show = false;
        this.taskData = [];
        this.rerender();
        swal.fire({
          icon: 'error',
          title: 'No data!',
          text: 'No Data available!'
        })
      } else if (data.status == 'NO_TELECALLERS') {
        this.show = false;
        this.taskData = [];
        this.rerender();
        swal.fire({
          icon: 'error',
          title: 'No Users!',
          text: 'No Tele-callers available!'
        })
      } else {
        this.show = false;
        this.taskData = [];
      }

    },
      err => {

      });
  }

  tempAllocateTask() {
    let selectedTaskList = this.taskData.filter(item => item.checked === true);
    if (selectedTaskList.length > 0) {
      let count = 0;
      let reqData = [];
      for (let entry of selectedTaskList) {
        if (entry.toTeleCaller && entry.reasons && entry.tempFromDate && entry.tempToDate) {
          reqData.push(entry.taskId + '-' + entry.toTeleCaller + '-' + entry.tempFromDate + '-' + entry.tempToDate + '-' + entry.reasons);
        } else {
          count++;
          break;
        }
      }
      if (count > 0) {
        swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Please recheck the selected Task'
        })
      } else {
        if (reqData.length > 0) {
          // alert(JSON.stringify(reqData));
          this.spinner.show();
          this.taskService.temporaryAllocation(reqData).subscribe(data => {
            this.spinner.hide();
            if (data.status == 'SUCCESS') {
              swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Task Temporarily allocated!!!',
                allowOutsideClick: false
              }).then((result) => {
                if (result.value) {
                  console.log(this.router.url);
                  this.router.navigateByUrl(this.router.url);
                }
              });
            }

          },
            err => {
              this.spinner.hide();
            });

        }
      }

    } else {
      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please Select any Task'
      })
    }
    console.log(" " + JSON.stringify(selectedTaskList));
  }



}
