import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  channelList = [];
  branchList = [];
  selectedItems = [];
  moduleList = [];
  showCloudCalling: Boolean = false;
  showDataLimit: Boolean = false;
  dropdownSettings = {};
  submitted: boolean;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit() {


    this.userForm = this.formBuilder.group({
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
      cloudCalling: new FormControl(),
      status: new FormControl('', [Validators.required]),
      module: new FormControl('', [Validators.required])
    });


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

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight: 100
    };
  }

  get f() { return this.userForm.controls; }

  getModuleNamesByRoleName(roleName) {
    this.moduleList = [];
    this.userService.getModouleNames(roleName).subscribe(data => {
      if (data.status == 'SUCCESS') {
        this.moduleList = data.responseList;
      }
    },
      err => {

      });
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

  updateUser(formValues) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
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
        if (data.status == 'SUCCESS') {
          swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'User Details Added Successfully!'
          })
          this.userForm.reset();
          this.submitted = false;
          // this.router.navigateByUrl("/adduser");

        }
      }
    },
      err => {
        this.spinner.hide();
      }
    );
  }

  checkUserName(userName) {
    if (null!=userName && userName.length>0) {
      this.spinner.show();
      this.userService.checkUserNameExistsOrNot(userName).subscribe(data => {
        this.spinner.hide();
        if(data.status=='FREE'){
          //do nothing
        }else{
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


}
