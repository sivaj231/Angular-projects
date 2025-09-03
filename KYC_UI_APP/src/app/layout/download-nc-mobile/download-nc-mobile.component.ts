import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FileServiceService } from "../../service/file-service.service";

@Component({
  selector: 'app-download-nc-mobile',
  templateUrl: './download-nc-mobile.component.html',
  styleUrls: ['./download-nc-mobile.component.css']
})
export class DownloadNcMobileComponent implements OnInit {
  minFromDate: Date;
  minToDate: Date;
  downloadInvalidForm: FormGroup;
  @ViewChild('downloadZipLink', { static: false }) private downloadZipLink: ElementRef;
  submitted: boolean = false;
  calendarStartDate: any;
  calendarEndDate: any;
  startDate: string;
  endDate: string;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private route: ActivatedRoute,
    private router: Router, private spinner: NgxSpinnerService, private fileService: FileServiceService) { }

  ngOnInit(): void {
    this.downloadInvalidForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }


  //set from date
  setFromDate() {
    this.minFromDate = new Date();
    this.minFromDate.setDate(this.minFromDate.getDate());
  }
  //set to date
  setToDate(fromDate) {
    this.minToDate = fromDate;
    this.minToDate.setDate(this.minToDate.getDate());
  }

  clearFormData() {
    this.downloadInvalidForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    })
  }

  async download(formValues) {
    var html = '';
    this.calendarStartDate = formValues.startDate;
    this.calendarEndDate = formValues.endDate;
    //converting date dd/mm/yyyy
    this.startDate = this.datePipe.transform(this.calendarStartDate, "dd/MM/yyyy");
    this.endDate = this.datePipe.transform(this.calendarEndDate, "dd/MM/yyyy");
    if (this.calendarStartDate.length == 0 && this.calendarEndDate.length == 0) {
      html = 'Please Enter Start Date & End Date';
      swal.fire({
        icon: 'error',
        title: 'Info!',
        text: html,
        allowOutsideClick: false

      })
    }
    else if (this.calendarStartDate.length == 0 && this.calendarEndDate.length != 0) {
      html = 'Start Date is required';
      swal.fire({
        icon: 'error',
        title: 'Info!',
        text: html,
        allowOutsideClick: false

      })
    }
    else if (this.calendarStartDate.length != 0 && this.calendarEndDate.length == 0) {
      html = 'End Date is required';
      swal.fire({
        icon: 'error',
        title: 'Info!',
        text: html,
        allowOutsideClick: false

      })
    }
    else {
      const blob = await this.fileService.downloadNcExcelFile(this.startDate, this.endDate);
      let fileName='NotContactable.xlsx';
      if (window.navigator.msSaveOrOpenBlob) //IE & Edge
      {
        //msSaveBlob only available for IE & Edge
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        const url = window.URL.createObjectURL(blob);
        const link = this.downloadZipLink.nativeElement;
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    }
  }

}
