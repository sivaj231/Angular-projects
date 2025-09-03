import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from "../../service/task.service";
import { SharedService } from "../../service/shared.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiUrlConstantService } from '../../service/api-url-constant.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-policy-details-motor',
  templateUrl: './policy-details-motor.component.html',
  styleUrls: ['./policy-details-motor.component.css']
})
export class PolicyDetailsMotorComponent implements OnInit {
  productionStatus: string = '';
  mobileNum: string = '';
  mobileNumber: string = '';
  vahanMobileNo: string = '';
  otp: String;
  reason: String = "";
  type: String = "";
  taskId: String = "";
  policyDetailsArr: any = [];
  display = "none";
  showOtpModal: Boolean = false;
  showTaskTransferModal: Boolean = false;
  cloudCalling: String;
  roles: String;
  showstep1: Boolean = false;
  showstep2: Boolean = false;
  showstep3: Boolean = false;
  showstep4: Boolean = false;
  radiobtn: any = '';
  radiobtn2: any = '';
  requestType='';
  isAltMobNumVerified = '';
  isTaskTransfered: Boolean = true;
  isTaskVerified: Boolean = true;
  clicked = 0;
  touched: Boolean = false;
  name = 'Set iframe source';
  url: string = "https://sg-agent.tcnp3.com/agentlogin/app";
  urlSafe: SafeResourceUrl;
  isDataAvailable: Boolean = true;
  businessType = '';
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _location: Location,
    public sanitizer: DomSanitizer,
    private apiUrl: ApiUrlConstantService
  ) {

    router.events
      .pipe(filter(
        (event: NavigationEvent) => {
          return (event instanceof NavigationStart);
        }
      )
      )
      .subscribe(
        (event: NavigationStart) => {
          console.group("NavigationStart Event");
          console.log("navigation id:", event.id);
          console.log("route:", event.url);
          console.log("trigger:", event.navigationTrigger);
          if (event.restoredState) {
            console.warn(
              "restoring navigation id:",
              event.restoredState.navigationId
            );
          }
          console.groupEnd();
        }
      );

  }


  ngOnInit(): void {
    this.productionStatus = this.apiUrl.PRODUCTION_STATUS;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
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

    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.type = this.route.snapshot.paramMap.get('type');
    this.businessType = 'MOTOR';
    this.getPolicyDetails(this.taskId, this.businessType);
  }

  flag: boolean;
  modalPopup(str) {
    this.flag = false;
    if (!this.flag) {
      this.openModal(str);
    }
    else {
      Swal.fire({
        title: 'Are you sure to confirm?',
        //text: 'Confirm!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      });
    }
  }

  openModal(str) {

    if (str == 'OTP') {
      if (this.isAltMobNumVerified == 'YES' && this.clicked == 0) {
        Swal.fire({
          title: 'Alternate Number Already Verified for this Task!!! Do you Want to reverify the number?',
          icon: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            this.clicked++;
            this.showOtpModal = true;
            this.showTaskTransferModal = false;
            this.manageDivsInsideOtpModal();
            this.display = "block";
          }
        });
      } else {
        this.display = "block";
        this.showOtpModal = true;
        this.showTaskTransferModal = false;
        this.manageDivsInsideOtpModal();
      }
    } else {
      this.display = "block";
      this.showOtpModal = false;
      this.showTaskTransferModal = true;
    }
  }
  onCloseHandled() {
    this.display = "none";
    this.showOtpModal = false;
    this.showTaskTransferModal = true;
  }

  manageDivsInsideOtpModal() {

    if (this.showstep1) {
      this.showstep2 = false;
      this.showstep3 = false;
      this.showstep4 = false;
    } else if (this.showstep2) {
      this.showstep1 = false;
      this.showstep3 = false;
      this.showstep4 = false;
    } else if (this.showstep3) {
      this.showstep1 = false;
      this.showstep2 = false;
      this.showstep4 = false;
    } else if (this.showstep4) {
      this.showstep1 = false;
      this.showstep2 = false;
      this.showstep3 = false;
    } else {
      this.showstep1 = true;
      this.showstep2 = false;
      this.showstep3 = false;
      this.showstep4 = false;
    }
  }
  step1confirmation() {
    if (this.radiobtn) {
      this.showstep1 = false;
      this.showstep2 = true;
      this.showstep3 = false;
      this.showstep4 = false;
    } else {
      Swal.fire({
        title: 'Please Select an Option',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  step2confirmation() {

    if (this.radiobtn == 'vahanNo') {
      let indNum = /^[0]?[6789]\d{9}$/;
      this.requestType = 'vahanNo';
      if (this.vahanMobileNo) {
        if (indNum.test(this.vahanMobileNo)) {
          if (this.radiobtn2 == 'otp') {
            this.sendOtpToCustomer(this.requestType, this.vahanMobileNo);
          } else {
            this.sendVerificationLink(this.requestType, this.vahanMobileNo);
          }
        } else {
          Swal.fire({
            title: 'Invalid Vahan Mobile ',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } else {
        Swal.fire({
          title: 'Vahan Number Not Available',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then((result) => {
          this.showstep1 = true;
          this.showstep2 = false;
          this.showstep3 = false;
          this.showstep4 = false;
        });
      }

    } else {
      this.showstep1 = false;
      this.showstep2 = false;
      this.showstep3 = true;
      this.showstep4 = false;

    }




  }

  step3confirmation() {
    let indNum = /^[0]?[6789]\d{9}$/;
    this.requestType = 'alternateNo';
    if (indNum.test(this.mobileNum)) {
      if (this.radiobtn2 == 'otp') {
        this.sendOtpToCustomer(this.requestType, this.mobileNum);
      } else {
        this.sendVerificationLink(this.requestType, this.mobileNum);
      }
    } else {
      Swal.fire({
        title: 'Invalid Mobile Number',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  sendOtpToCustomer(requestType, mobileNum) {
    this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
    this.spinner.show();
    this.taskService.sendOtp(this.taskId, mobileNum, requestType).subscribe(data => {
      this.spinner.hide();
      if (data.status == 'SUCCESS') {
        Swal.fire({
          title: 'OTP Sent!',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }).then((result) => {
          this.showstep1 = false;
          this.showstep2 = false;
          this.showstep3 = false;
          this.showstep4 = true;
        });
      }
    },
      err => {
        this.spinner.hide();
      })
    this.showstep1 = false;
    this.showstep2 = false;
    this.showstep3 = false;
    this.showstep4 = true;

  }

  sendVerificationLink(requestType, mobileNum) {
    this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
    this.spinner.show();

    this.taskService.sendVerification(this.taskId, mobileNum, requestType).subscribe(data => {
      this.spinner.hide();
      if (data.status == 'SUCCESS') {
        Swal.fire({
          title: 'Activation Link Sent!',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            this.showstep1 = true;
            this.showstep2 = false;
            this.showstep3 = false;
            this.showstep4 = false;
          }
        });
      } else {
        Swal.fire({
          title: 'Please Try Again!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
      err => {
        this.spinner.hide();
      });
    this.showstep1 = true;
    this.showstep2 = false;
    this.showstep3 = false;
    this.showstep4 = false;
  }

  step1Back() {
    this.showstep1 = true;
    this.showstep2 = false;
    this.showstep3 = false;

  }

  step2Back() {
    this.showstep1 = false;
    this.showstep2 = true;
    this.showstep3 = false;
  }
  getPolicyDetails(taskId, businessType) {
    this.spinner.show();
    this.taskService.policyDetails(taskId, businessType).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == "SUCCESS") {
          this.policyDetailsArr = data.responseData.motorPolicyResponseDto;
          this.isAltMobNumVerified = data.responseData.isAlternateNumVerified;
          this.isTaskTransfered = data.responseData.isTaskTransfered;
          this.isTaskVerified = data.responseData.isVerified;
          this.isDataAvailable = true;
          this.vahanMobileNo = data.responseData.motorPolicyResponseDto[0].vahanNo;
        } else {
          this.isDataAvailable = false;
        }
      }
    },
      err => {
        this.spinner.hide();
        this.isDataAvailable = false;
      });

  }

  clearTouchLogin() {
    this.spinner.show();
    this.taskService.agentLogin().subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == "SUCCESS") {
          window.open(data.responseData);
        } else {
          Swal.fire({
            title: 'Please try Again',
            text: 'Error!',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
          });
        }
      }
    });
  }

  clearTouchCallFunction(taskId) {
    
    if (this.mobileNumber) {
      let indNum = /^[0]?[6789]\d{9}$/;
      if (indNum.test(this.mobileNumber)) {
        this.spinner.show();
        this.taskService.callFunction(taskId, this.mobileNumber).subscribe(data => {
          this.spinner.hide();
          if (data) {
            if (data.status == "SUCCESS") {
              Swal.fire({
                title: 'Call was Scheduled Successfully',
                text: 'Confirm!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: data.errorMessage,
                text: 'Error!',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
              });
            }
          }
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      } else {
        Swal.fire({
          title: 'Invalid Phone is Empty',
          text: 'Error!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      }

    } else {
      Swal.fire({
        title: 'Phone Number is Empty',
        text: 'Error!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    }
  }


  clearTouchCallFunctionVahan(taskId){
    
    if (this.vahanMobileNo) {
      let indNum = /^[0]?[6789]\d{9}$/;
      if (indNum.test(this.vahanMobileNo)) {
        this.spinner.show();
        this.taskService.callFunction(taskId, this.vahanMobileNo).subscribe(data => {
          this.spinner.hide();
          if (data) {
            if (data.status == "SUCCESS") {
              Swal.fire({
                title: 'Call was Scheduled Successfully',
                text: 'Confirm!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: data.errorMessage,
                text: 'Error!',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
              });
            }
          }
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      } else {
        Swal.fire({
          title: 'Invalid Phone is Empty',
          text: 'Error!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      }

    } else {
      Swal.fire({
        title: 'Phone Number is Empty',
        text: 'Error!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    }
  }


  clearTouchCallFunctionLive(taskId, mobileNumber){
    
    if (mobileNumber) {
      let indNum = /^[0]?[6789]\d{9}$/;
      if (indNum.test(mobileNumber)) {
        this.spinner.show();
        this.taskService.callFunction(taskId, mobileNumber).subscribe(data => {
          this.spinner.hide();
          if (data) {
            if (data.status == "SUCCESS") {
              Swal.fire({
                title: 'Call was Scheduled Successfully',
                text: 'Confirm!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
              });
            } else {
              Swal.fire({
                title: data.errorMessage,
                text: 'Error!',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
              });
            }
          }
        },
          err => {
            console.log(err);
            this.spinner.hide();
          });
      } else {
        Swal.fire({
          title: 'Invalid Phone is Empty',
          text: 'Error!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      }

    } else {
      Swal.fire({
        title: 'Phone Number is Empty',
        text: 'Error!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    }
  }


  verifyOtp() {
    if (this.otp) {
      if (this.radiobtn == 'vahanNo') {
        this.requestType = 'vahanNo';
        this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
        this.taskService.verifyOtp(this.taskId, this.otp,this.requestType).subscribe(data => {
          if (data.status == 'SUCCESS') {
            Swal.fire({
              title: 'Vahan Number Verified',
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                console.log(this.router.url);
                this.router.navigateByUrl(this.router.url);
              }
            });
          } else if (data.status == 'INVALID_OTP') {
            Swal.fire({
              title: 'Invalid OTP!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Error Please try Again!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        },
          err => {
            Swal.fire({
              title: 'Error Please try Again!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      } else {
        this.requestType = 'alternateNo';
        this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
        this.taskService.verifyOtp(this.taskId, this.otp,this.requestType).subscribe(data => {
          if (data.status == 'SUCCESS') {
            Swal.fire({
              title: 'Alternate Number Verified',
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                console.log(this.router.url);
                this.router.navigateByUrl(this.router.url);
              }
            });
          } else if (data.status == 'INVALID_OTP') {
            Swal.fire({
              title: 'Invalid OTP!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Error Please try Again!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        },
          err => {
            Swal.fire({
              title: 'Error Please try Again!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      }

    } else {
      Swal.fire({
        title: 'Please Enter otp!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  cancelReason() {
    this.reason = '';
  }

  cancelAlternateNumber() {
    this.mobileNum = '';
  }

  cancelOtp() {
    this.otp = '';
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  taskTransfer() {
    if (this.reason) {
      this.spinner.show();
      this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
      this.taskService.transferTask(this.taskId, this.reason).subscribe(data => {
        this.spinner.hide();
        if (data.status == 'SUCCESS') {
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Task Transfered Successfully!',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl("/myTask");
            }
          })
        } else if (data.status == 'TEMP_TASK') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Temporary Task Cannot be Transfered!',
            allowOutsideClick: false
          });
        } else if (data.status == 'NO_USER') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Branch Manager/TL available for this task\'s Branch or Channel!',
            allowOutsideClick: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Please Try Again!',
            allowOutsideClick: false
          })
        }
      },
        err => {
          this.spinner.show();
        });
    } else {
      Swal.fire({
        title: 'Please Enter Reason!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }

  }

}
