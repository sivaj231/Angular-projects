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
  selector: 'app-re-allocate',
  templateUrl: './re-allocate.component.html',
  styleUrls: ['./re-allocate.component.css']
})
export class ReAllocateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  taskData: any;
  dtTrigger: Subject<any> = new Subject<any>();
  reallocateForm: FormGroup;
  branches = [];
  channels = [];
  overAllBranches = [];
  teleCallers = [];
  submitted = false;
  show = false;
  toTeleCallers = [];
  showGeneralBranch : Boolean = false;
  event_type:any;
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

    this.reallocateForm = this.formBuilder.group({
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
    return this.reallocateForm.controls;
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

  getDetails(formValue) {
    this.submitted = true;
    if (this.reallocateForm.invalid) {
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
    this.taskService.getTaksForreallocateTask(taskModificationDto).subscribe(data => {
      this.taskData = [];
      this.spinner.hide();
      if (data.status == 'SUCCESS') {
        this.show = true;
        this.rerender();
        this.taskData = data.responseData;
        this.toTeleCallers = data.responseList;
      } else if (data.status == 'NO_DATA') {
        this.rerender();
        this.show = false;
        this.taskData = [];
        swal.fire({
          icon: 'error',
          title: 'No data!',
          text: 'No Data available!'
        })
      } else if (data.status == 'NO_TELECALLERS') {
        this.rerender();
        this.show = false;
        this.taskData = [];
        swal.fire({
          icon: 'error',
          title: 'No Users!',
          text: 'No Tele-callers available!'
        })
      } else {
        this.rerender();
        this.show = false;
        this.taskData = [];
      }

    },
      err => {

      });
  }

  getTeleCallers() {
    let channel = this.reallocateForm.get('selectedChannel').value;
    let branch = this.reallocateForm.get('selectedBranch').value;
    if(channel && branch){
      this.event_type = [];
      this.spinner.show();
      this.userService.getTeleCallerBasedOnBranchAndChannel(channel, branch).subscribe(data => {
        this.spinner.hide();
        if (data.status == 'SUCCESS') {
          this.teleCallers = data.responseData;
        }else{
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

  reAllocateClickFunction() {
    let selectedTaskList = this.taskData.filter(item => item.checked === true);
    if (selectedTaskList.length > 0) {
      let count = 0;
      let reqData = [];
      for (let entry of selectedTaskList) {
        if (entry.toTeleCaller && entry.reasons) {
          reqData.push(entry.taskId + '-' + entry.toTeleCaller + '-' + entry.reasons);
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
          //alert(JSON.stringify(reqData));
          this.spinner.show();
          this.taskService.reallocateTask(reqData).subscribe(data=>{
            this.spinner.hide();
            if(data.status=='SUCCESS'){
              swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Task Re-Allocated Successfully',
                allowOutsideClick :false
              }).then((result) => {
                if (result.value) {
                  console.log(this.router.url);
                  this.router.navigateByUrl(this.router.url);
                }
              });
            }

          },
          err=>{
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


  branchTransferToggle(value) {
    const transferBranch = this.reallocateForm.get('transferBranch');
    if (value == 'YES') {
      this.showGeneralBranch = true;
      transferBranch.setValidators(Validators.required);
    } else {
      transferBranch.clearValidators();
      this.showGeneralBranch = false;
    }
    transferBranch.updateValueAndValidity();
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

  updateComments(event, i) {
    this.taskData[i].reasons = event.target.value;
  }

}
