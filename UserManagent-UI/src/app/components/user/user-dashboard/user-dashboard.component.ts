import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  tableGridData: any[] = [];

  userDetails: any[] = [];

  appDetailsDto: any[] = [];

  itAssetDto: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.getCurrentEmpDetails();

  }

  getCurrentEmpDetails() {

    this.userService.getCurrentEmployeeDetails().subscribe((data: any) => {

      this.userDetails = data.responseDto[0];

      this.appDetailsDto =  data.responseDto[0].appDetailsDto;

      this.itAssetDto =  data.responseDto[0].itAssetDto;

    })

  }

}
