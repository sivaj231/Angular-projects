import { Component, OnInit } from '@angular/core';

import { EmployeeService } from "../../services/employeeService";

import { AppConstants } from "../../constants/AppConstants";
import { BranchDto } from '../../services/branchDto';


// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  tableGridData: BranchDto[];

  dashboardCount: any = {};

  departmentChartCount: any = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.getRecentlyAddedEmployeeList();

    this.getDashBoardCount();

    // this.getDepartmentChartCount();


    this.employeeService.getDepartmentCountChart().subscribe((data: any) => {

      let chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.data = data.responseDto;

      // var colorSet = new am4core.ColorSet();
      // colorSet.list = ["#00ccff", "#3498DB", "#D11A0B"].map(function (color) {
      //   return am4core.color(color);
      // });


      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "count";
      pieSeries.dataFields.category = "department";
      pieSeries.ticks.template.disabled = true;
      pieSeries.labels.template.disabled = true;

      let label = pieSeries.createChild(am4core.Label);
      label.text = "Total No. of Departments - " + data.responseDto.length;
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.fontSize = 10;

      // pieSeries.colors = colorSet;
      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(60);

      // Set up fills
      pieSeries.slices.template.fillOpacity = 1;

      var hs = pieSeries.slices.template.states.getKey("hover");
      hs.properties.scale = 1;
      hs.properties.fillOpacity = 0.5;
      chart.logo.disabled = true;

      chart.legend = new am4charts.Legend();


    })

    // chart.data = this.departmentChartCount;


  }

  getDepartmentChartCount() {

    this.employeeService.getDepartmentCountChart().subscribe((data: any) => {

      // this.dashboardCount = data.responseDto[0];

      this.departmentChartCount = data.responseDto;

    })



  }

  getDashBoardCount() {

    this.employeeService.getDashboardCount().subscribe((data: any) => {

      this.dashboardCount = data.responseDto[0];

    })

  }

  getRecentlyAddedEmployeeList() {

    this.employeeService.getRecentlyAddedEmployeeList().subscribe((data: any) => {

      this.tableGridData = data.responseDto;

    })

  }

}
