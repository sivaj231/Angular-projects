import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../service/user.service";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from "../../service/shared.service";
import { Location } from "@angular/common";
import swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  userData: any;
  userForm: FormGroup;
  dtTrigger: Subject<any> = new Subject<any>();
  showCloudCalling: Boolean = false;
  showDataLimit: Boolean = false;
  submitted: boolean = false;
  dropdownSettings: any;
  channelList: any = [];
  moduleList: any = [];
  branchList: any = [];
  userDto: any = [];
  roles = '';
  disable: Boolean = true;


  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _location: Location,
    private sharedService: SharedService
  ) { }


  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.userForm = this.formBuilder.group({
      id: new FormControl(''),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      empCode: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
      role: new FormControl('', [Validators.required]),
      dataLimit: new FormControl(),
      channel: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      cloudCalling: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      module: new FormControl('', [Validators.required])
    });
    this.userForm.disable();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
    };

    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if (data) {
          this.roles = data.userDetails.userRoles[0];
        }
      });
    }




    this.viewUser();
    this.dropdownSettings = {
      defaultOpen: true,
      singleSelection: false,
      enableCheckAll: false,
      itemsShowLimit: 2,
      allowSearchFilter: true,
      maxHeight: 100,
      disabled: true,
      limitSelection: -1
    };
  }



  getModuleNamesByRoleName(roleName) {
    this.moduleList = [];
    this.userForm.get('module').reset();
    this.userService.getModouleNames(roleName).subscribe(data => {
      if (data.status == 'SUCCESS') {
        this.moduleList = data.responseList;
      }
    },
      err => {

      });
  }

  get f() { return this.userForm.controls; }

  display = "none";

  contentEdit() {
    this.userForm.enable();
    this.disable = false;
  }

  cancelEdit() {
    this.userForm.disable();
    this.disable = true;
    var id = (<HTMLInputElement>document.getElementById("id")).value;
    if (id != null && id != '') {
      this.getUserById(id);
    }
  }

  openModal(id) {
    this.display = "block";
    this.getUserById(id);
  }
  onCloseHandled() {
    this.userForm.reset();
    this.display = "none";
    this.userForm.disable();
    this.disable = true;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  getUserById(id) {
    this.spinner.show();
    this.userService.getUserById(id).subscribe(data => {
      if (data) {
        if (data.status = 'SUCCESS') {
          this.userDto = data.responseData;
          this.getModuleNamesByRoleName(this.userDto.roleName);
          this.getChannelsAndBranchList();
          this.spinner.hide();
          if (this.userDto.roleName == 'ROLE_TELECALLER') {
            this.showDataLimit = true;
          } else {
            this.showCloudCalling = true;
          }
          this.userForm.patchValue({
            id: this.userDto.id,
            userName: this.userDto.userName,
            password: this.userDto.password,
            empCode: this.userDto.employeeCode,
            firstName: this.userDto.firstName,
            middleName: this.userDto.middleName,
            lastName: this.userDto.lastName,
            emailId: this.userDto.email,
            mobile: this.userDto.mobile,
            role: this.userDto.roleName,
            dataLimit: this.userDto.taskLimit,
            channel: this.userDto.channel,
            branch: this.userDto.branch,
            cloudCalling: this.userDto.cloudCalling,
            status: this.userDto.status,
            module: this.userDto.modules
          })
        }
      }
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  getChannelsAndBranchList() {
    this.userService.getChannelAndBranchList().subscribe(
      data => {
        if (data) {
          if (data.status == 'SUCCESS') {
            this.channelList = data.responseData.channelList;
            this.branchList = data.responseData.branchList;
          } else {

          }
        }
      },
      err => {

      }
    );
  }





  cloudCallingToggle(value) {
    const cloudCalling = this.userForm.get('cloudCalling');
    if (value == 'ROLE_MANAGER' || value == 'ROLE_TEAM_LEADER') {
      this.showCloudCalling = true;
      cloudCalling.setValidators(Validators.required);
      this.showDataLimit = false;
    } else {
      cloudCalling.clearValidators();
      this.showCloudCalling = false;
      this.showDataLimit = true;
    }
    cloudCalling.updateValueAndValidity();
  }


  viewUser() {
    this.spinner.show();
    this.userService.viewUser().subscribe(data => {
      if (data.status == 'SUCCESS') {
        this.userData = data.responseData;
        this.spinner.hide();
        this.rerender();
      }
    },
      err => {
        this.spinner.hide();
      });
  }

  updateUser(formValues) {
    this.submitted = true;
    if (this.userForm.invalid) {
      const invalid = [];
      const controls = this.userForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      return invalid;
    }
    let userDto = {
      userName: formValues.userName,
      password: formValues.password,
      employeeCode: formValues.empCode,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      middleName: formValues.middleName,
      email: formValues.emailId,
      mobile: formValues.mobile,
      taskLimit: formValues.dataLimit,
      status: formValues.status,
      channel: formValues.channel,
      branch: formValues.branch,
      modules: formValues.module,
      roleName: formValues.role,
      cloudCalling: formValues.cloudCalling
    }
    this.spinner.show();
    this.userService.saveUser(userDto).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (data.status == 'UPDATED') {
          swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'User Details Updated Successfully!'
          }).then((result) => {
            if (result.value) {
              //console.log(this.router.url);
              this.router.navigateByUrl(this.router.url);
            }
          })
          this.submitted = false;
        }
      }
    },
      err => {

      }
    );
  }

  checkUserName(userName) {
    if (null != userName && userName.length > 0) {
      if (userName == this.userDto.userName) {

      } else {
        this.spinner.show();
        this.userService.checkUserNameExistsOrNot(userName).subscribe(data => {
          this.spinner.hide();
          if (data.status == 'FREE') {
            //do nothing
          } else {
            //clear input field
            this.userForm.get('userName').reset();
            swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'User Name Already Exists!'
            });
          }
        },
          err => {
            this.spinner.hide();
          });
      }
    }
    // if (null!=userName && userName.length>0) {
    //   this.spinner.show();
    //   this.userService.checkUserNameExistsOrNot(userName).subscribe(data => {
    //     this.spinner.hide();
    //     if(data.status=='FREE'){
    //       //do nothing
    //     }else{
    //       //clear input field
    //       this.userForm.get('userName').reset();
    //       swal.fire({
    //         icon: 'error',
    //         title: 'Error!',
    //         text: 'User Name Already Exists!'
    //       });
    //     }
    //   },
    //     err => {
    //       this.spinner.hide();
    //     });
    // }
  }


  createUser() {
    this.router.navigateByUrl('/createUser');
  }

}
