import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { SharedService } from "../../service/shared.service";
import { TaskService } from "../../service/task.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  roles: String = "";
  cloudCalling: String = "";
  showReminder: Boolean = false;
  reminderTaskList:any;
  type= "POLICY_DETAILS";
  constructor(private _router: Router, private authService: AuthenticationService, private tokenStorage: TokenStorageService,
    private sharedService: SharedService, private taskService:TaskService, private spinner:NgxSpinnerService,private router: Router) { }

  ngOnInit() {
    if (this.sharedService.sharedData) {
      this.sharedService.sharedData.subscribe((data) => {
        if (data) {
          console.log(data);
          this.roles = data.userDetails.userRoles[0];
          this.cloudCalling = data.userDetails.cloudCalling;
        } else {
        }
      });
      if (this.roles == 'ROLE_TELECALLER') {
        this.showReminder = true;
        this.getReminders();
      } else if (this.roles == 'ROLE_TEAM_LEADER' || this.roles == 'ROLE_MANAGER') {
        if (this.cloudCalling == 'YES') {
          this.showReminder = true;
          this.getReminders();
        } else {
          this.showReminder = false;
        }
      }
    }

  }

  getReminders() {
    this.taskService.getReminders().subscribe(data=>{
      if(data.status=='SUCCESS'){
        this.reminderTaskList=data.responseData;
      }
    },
    err=>{

    });
  }

  redirectToPolicyPage(taskId,businessType){
    if(businessType=='HEALTH'){
      this.router.navigate(['/policyDetails',taskId, this.type]);
    }else if(businessType == 'MOTOR'){
      this.router.navigate(['/policyDetailsMotor',taskId, this.type]);
    }
  }

}
