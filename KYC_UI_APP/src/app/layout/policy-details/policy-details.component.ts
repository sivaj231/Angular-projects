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
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  productionStatus = '';
  mobileNum: string = '';
  mobileNumber: string = '';
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
  radiobtn: any = '';
  isAltMobNumVerified = '';
  isTaskTransfered: Boolean = true;
  isTaskVerified: Boolean = true;
  clicked = 0;
  touched: Boolean = false;
  name = 'Set iframe source';
  url: string = "https://sg-agent.tcnp3.com/agentlogin/app";
  urlSafe: SafeResourceUrl;
  isDataAvailable: Boolean = true;
  businessType ='';
  requestType='';
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
    this.productionStatus = this.apiUrl.PRODUCTION_STATUS;
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.type = this.route.snapshot.paramMap.get('type');
    this.businessType = 'HEALTH';
    this.getPolicyDetails(this.taskId,this.businessType);
    
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
    } else if (this.showstep2) {
      this.showstep1 = false;
      this.showstep3 = false;
    } else if (this.showstep3) {
      this.showstep1 = false;
      this.showstep2 = false;
    } else {
      this.showstep1 = true;
      this.showstep2 = false;
      this.showstep3 = false;
    }
  }
  step1confirmation() {
    if (this.radiobtn) {
      this.showstep1 = false;
      this.showstep2 = true;
      this.showstep3 = false;
    } else {
      Swal.fire({
        title: 'Please Select an Option',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  step2confirmation() {
    let indNum = /^[0]?[6789]\d{9}$/;
    if (indNum.test(this.mobileNum)) {
      if (this.radiobtn == 'otp') {
        this.sendOtpToCustomer();
      } else {
        this.sendVerificationLink();
      }
    } else {
      Swal.fire({
        title: 'Invalid Mobile Number',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
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
  getPolicyDetails(taskId,businessType) {
    this.spinner.show();
    this.taskService.policyDetails(taskId, businessType).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == "SUCCESS") {
          this.policyDetailsArr = data.responseData.policyDto;
          this.isAltMobNumVerified = data.responseData.isAlternateNumVerified;
          this.isTaskTransfered = data.responseData.isTaskTransfered;
          this.isTaskVerified = data.responseData.isVerified;
          this.isDataAvailable = true;
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
    this.taskService.agentLogin().subscribe(data=>{
      this.spinner.hide();
      if(data){
        if (data.status == "SUCCESS") {
          window.open(data.responseData);
        }else{
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
      }else{
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





  clearTouchCallFunctionLive(taskId,mobileNum){

    if (mobileNum) {
      let indNum = /^[0]?[6789]\d{9}$/;
      if (indNum.test(mobileNum)) {
        this.spinner.show();
        this.taskService.callFunction(taskId, mobileNum).subscribe(data => {
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
      }else{
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
      this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
      this.requestType = 'alternateNo';
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

  sendOtpToCustomer() {
    this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
    this.requestType = 'alternateNo';
    this.spinner.show();
    this.taskService.sendOtp(this.taskId, this.mobileNum,this.requestType).subscribe(data => {
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
          this.showstep3 = true;
        });
      }
    },
      err => {
        this.spinner.hide();
      })

  }

  sendVerificationLink() {
    this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
    this.spinner.show();
    this.requestType = 'alternateNo';
    this.taskService.sendVerification(this.taskId, this.mobileNum, this.requestType).subscribe(data => {
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

  closeModal() {
    let li = (<HTMLInputElement>document.getElementById("stepss1"));
    let li2 = (<HTMLInputElement>document.getElementById("stepss2"));
    let li3 = (<HTMLInputElement>document.getElementById("stepss3"));
    li.classList.add('active');
    li2.classList.remove('active');
    li3.classList.remove('active');

    this.display = 'none';
    let div = (<HTMLInputElement>document.getElementById("step1"));
    let div2 = (<HTMLInputElement>document.getElementById("step2"));
    let div3 = (<HTMLInputElement>document.getElementById("step3"));
    //alert(div);
    div.classList.add('active');
    div2.classList.remove('active');
    div3.classList.remove('active');
  }

}
