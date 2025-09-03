import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  empDetails: any = [];

  appDetailsDto: any[] = [];

  itAssetDto: any[] = [];

  commonDriveList: any[] = [];

  reportsDashboardMappingList: any[] = [];

  roleName: any = "";

  mappedRoles: any = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.roleName = localStorage.getItem('roleName');

    this.getCurrentEmpDetails();

  }

  getCurrentEmpDetails() {

    this.userService.getCurrentEmployeeDetails().subscribe((data: any) => {

      this.empDetails = data.responseDto[0];

      this.appDetailsDto = data.responseDto[0].appDetailsDto;

      this.itAssetDto = data.responseDto[0].itAssetDto;

      this.commonDriveList = data.responseDto[0].commonDriveMappingDtos;

      this.reportsDashboardMappingList = data.responseDto[0].reportDashboardMappingDtos;

    })

  }

  viewMappedRoles(item) {

    this.mappedRoles = item.roleName;

  }

}
