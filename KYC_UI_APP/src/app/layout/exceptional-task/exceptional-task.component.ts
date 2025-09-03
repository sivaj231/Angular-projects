import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { TaskService } from "../../service/task.service";
import { UserService } from "../../service/user.service";
import { SharedService } from "../../service/shared.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-exceptional-task',
  templateUrl: './exceptional-task.component.html',
  styleUrls: ['./exceptional-task.component.css']
})
export class ExceptionalTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  taskData: any;
  telecallerArr = [];
  teleCaller = "";
  taskId = "";
  cloudCalling: String;
  roles: String;
  constructor(
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if (data) {
          this.cloudCalling = data.userDetails.cloudCalling;
          this.roles = data.userDetails.userRoles[0];
        }
      });
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
    };
    this.showExceptionalTask();
  }

  showExceptionalTask() {
    this.spinner.show();
    this.taskService.getExceptionalTask().subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == 'SUCCESS') {
          this.taskData = data.responseData;
          this.rerender();
        }
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


  opensweetalertcst() {
    Swal.fire({
      title: 'Are you sure to confirm?',
      //text: 'Confirm!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK, to Confirm!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl("/assigned-task")
      }
    })
  }


  display = "none";
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


  assignToMe(taskId) {
    if (this.cloudCalling == 'YES') {
      Swal.fire({
        title: 'Are you sure to Assign This Task To You?',
        //text: 'Confirm!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK, to Confirm!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          let exceptionTaskReqDto = {
            taskId: taskId,
            requestType: 'ASSIGN_TO_ME',
            resendUser: '',
            reallocateUser: ''
          }
          this.spinner.show();
          this.taskService.exceptionTaskManagement(exceptionTaskReqDto).subscribe(data => {
            this.spinner.hide();
            if (data) {
              if (data.status == 'SUCCESS') {
                Swal.fire({
                  title: 'Task Assigned Successfully',
                  icon: 'warning',
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.value) {
                    console.log(this.router.url);
                    this.router.navigateByUrl(this.router.url);
                  }
                })
              } else if (data.status = "PROCESSED") {
                Swal.fire({
                  title: 'Sorry. This Task is Already Processed By Another Manager/TL',
                  icon: 'error',
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.value) {
                    console.log(this.router.url);
                    this.router.navigateByUrl(this.router.url);
                  }
                })
              } else {
                Swal.fire({
                  title: 'Error! Please Try Again',
                  icon: 'error',
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.value) {
                    console.log(this.router.url);
                    this.router.navigateByUrl(this.router.url);
                  }
                })
              }
            }
          },
            err => {
              this.spinner.hide();
            });
        }
      });
    } else {
      Swal.fire({
        title: 'Sorry You Cannot Assign to this task To Yourself, Since you dont have cloud calling access',
        //text: 'Confirm!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK'
      })
    }

  }

  resend(taskId, resendUser) {
    Swal.fire({
      title: 'Are you sure to Re-send This Task?',
      //text: 'Confirm!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK, to Confirm!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        let exceptionTaskReqDto = {
          taskId: taskId,
          requestType: 'RE_SEND',
          resendUser: resendUser,
          reallocateUser: ''
        }
        this.spinner.show();
        this.taskService.exceptionTaskManagement(exceptionTaskReqDto).subscribe(data => {
          this.spinner.hide();
          if (data) {
            if (data.status == 'SUCCESS') {
              Swal.fire({
                title: 'Task Successfully Resent',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
                allowOutsideClick: false
              }).then((result) => {
                if (result.value) {
                  console.log(this.router.url);
                  this.router.navigateByUrl(this.router.url);
                }
              })
            } else if (data.status = "PROCESSED") {
              Swal.fire({
                title: 'Sorry. This Task is Already Processed By Another Manager/TL',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
                allowOutsideClick: false
              }).then((result) => {
                if (result.value) {
                  console.log(this.router.url);
                  this.router.navigateByUrl(this.router.url);
                }
              })
            } else {
              Swal.fire({
                title: 'Error! Please Try Again',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
                allowOutsideClick: false
              }).then((result) => {
                if (result.value) {
                  console.log(this.router.url);
                  this.router.navigateByUrl(this.router.url);
                }
              })
            }
          }
        },
          err => {
            this.spinner.hide();
          });
      }
    });

  }

  reallocate(taskId, branch, channel, originalUser) {
    Swal.fire({
      title: 'Are you sure to Re-allocate This Task to Another Telecaller?',
      //text: 'Confirm!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK, to Confirm!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.taskId = taskId;
        this.openModal();
        this.getTeleCallersList(branch, channel);
      }
    })

  }

  reallocateTask() {
    if (this.teleCaller) {
      let exceptionTaskReqDto = {
        taskId: this.taskId,
        requestType: 'RE_ALLOCATE',
        resendUser: '',
        reallocateUser: this.teleCaller
      }
      this.spinner.show();
      this.taskService.exceptionTaskManagement(exceptionTaskReqDto).subscribe(data => {
        this.spinner.hide();
        if (data) {
          if (data.status == 'SUCCESS') {
            Swal.fire({
              title: 'Task Successfully Reallocated',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                console.log(this.router.url);
                this.router.navigateByUrl(this.router.url);
              }
            })
          } else if (data.status = "PROCESSED") {
            Swal.fire({
              title: 'Sorry. This Task is Already Processed By Another Manager/TL',
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                console.log(this.router.url);
                this.router.navigateByUrl(this.router.url);
              }
            })
          } else {
            Swal.fire({
              title: 'Error! Please Try Again',
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                console.log(this.router.url);
                this.router.navigateByUrl(this.router.url);
              }
            })
          }
        }
      },
        err => {
          this.spinner.hide();
        });

    } else {

    }

  }

  getTeleCallersList(branch, channel) {
    this.spinner.show();
    this.userService.getTeleCallerBasedOnBranchAndChannel(channel, branch).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == 'SUCCESS') {
          this.telecallerArr = data.responseData;
        }
      }
    },
      err => {
        this.spinner.hide();
      });
  }

  viewExceptionalTask() {
    this.router.navigateByUrl('/viewExceptionalTask');
  }

}
