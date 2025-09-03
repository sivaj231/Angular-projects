// import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { TaskService } from '../../service/task.service';
// declare var jquery: any;
// declare var $: any;


// @Component({
//   selector: 'app-send-otp',
//   templateUrl: './send-otp.component.html',
//   styleUrls: ['./send-otp.component.css']
// })
// export class SendOtpComponent implements OnInit {

//   public mobileNum: String;
//   public otp: String;
//   taskId: String;
//   display = "none";
//   constructor(
//     private taskService: TaskService
//   ) { }

//   ngOnInit(): void {
//     $(document).ready(function () {
//       var self = this;
//       $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//         var target = $(e.target);
//         if (target.parent().hasClass('disabled')) {
//           return false;
//         }
//       });

//       $(".radioSubmit").click(function (e) {
//         var option = $("input[name='radiobtn']:checked").val();
//         if (option != undefined) {
//           var active = $('.wizard .nav-tabs li.active');
//           active.next().removeClass('disabled');
//           nextTab(active);
//         } else {
//           Swal.fire({
//             title: 'Please Select an Option',
//             //text: 'Confirm!',
//             icon: 'error',
//             //showCancelButton: true,
//             confirmButtonText: 'OK',
//             //cancelButtonText: 'Cancel'
//           });
//         }
//       });

//       $(".alternateNumberSubmit").click(function (e) {
//         var option = $("input[name='radiobtn']:checked").val();
//         var indNum = /^[0]?[789]\d{9}$/;
//         if (indNum.test(self.mobileNum)) {
//           if (option == 'otp') {
//             self.sendOtpToCustomer();
//             var active = $('.wizard .nav-tabs li.active');
//             active.next().removeClass('disabled');
//             nextTab(active);
//           } else {
//             self.sendVerificationLink();
//           }
//         } else {
//           Swal.fire({
//             title: 'Invalid Mobile Number',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//         }

//       });

//       $(".prev-step").click(function (e) {
//         var active = $('.wizard .nav-tabs li.active');
//         prevTab(active);
//       });
//     }.bind(this));

//     function nextTab(elem) {
//       $(elem).next().find('a[data-toggle="tab"]').click();
//     }
//     function prevTab(elem) {
//       $(elem).prev().find('a[data-toggle="tab"]').click();
//     }


//     $('.nav-tabs').on('click', 'li', function () {
//       $('.nav-tabs li.active').removeClass('active');
//       $(this).addClass('active');
//     });

//   }

//   verifyOtp() {
//     if (this.otp) {
//       this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
//       this.taskService.verifyOtp(this.taskId, this.otp,'').subscribe(data => {
//         if (data.status == 'SUCCESS') {
//           Swal.fire({
//             title: 'Alternate Number Verified',
//             icon: 'success',
//             confirmButtonText: 'OK',
//           });

//         } else if (data.status == 'INVALID_OTP') {
//           Swal.fire({
//             title: 'Invalid OTP!',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//         } else {
//           Swal.fire({
//             title: 'Error Please try Again!',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//         }
//       },
//         err => {
//           Swal.fire({
//             title: 'Error Please try Again!',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//         });
//     } else {
//       Swal.fire({
//         title: 'Please Enter otp!',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//     }
//   }


//   sendOtpToCustomer() {
//     this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
//     this.taskService.sendOtp(this.taskId, this.mobileNum,'').subscribe(data => {
//       if (data.status == 'SUCCESS') {
//         Swal.fire({
//           title: 'OTP Sent!',
//           icon: 'success',
//           confirmButtonText: 'OK',
//           allowOutsideClick: false
//         });
//       }
//     },
//       err => {

//       })

//   }

//   sendVerificationLink() {
//     this.taskId = (<HTMLInputElement>document.getElementById("taskId")).value;
//     this.taskService.sendVerification(this.taskId, this.mobileNum).subscribe(data => {
//       if (data.status == 'SUCCESS') {
//         Swal.fire({
//           title: 'Activation Link Sent!',
//           icon: 'success',
//           confirmButtonText: 'OK',
//           allowOutsideClick: false,
//         });
//       } else {
//         Swal.fire({
//           title: 'Please Try Again!',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     },
//       err => {

//       });
//   }


//   numberOnly(event): boolean {
//     const charCode = (event.which) ? event.which : event.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//       return false;
//     }
//     return true;

//   }

//   closeModal(){
    
//   }
 


// }
