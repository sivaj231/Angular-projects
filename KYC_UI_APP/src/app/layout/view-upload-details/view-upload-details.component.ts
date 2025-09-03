import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FileServiceService } from "../../service/file-service.service";



@Component({
  selector: 'app-view-upload-details',
  templateUrl: './view-upload-details.component.html',
  styleUrls: ['./view-upload-details.component.css']
})
export class ViewUploadDetailsComponent implements OnInit {
  minFromDate: Date;
  minToDate: Date;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('downloadZipLink', { static: false }) private downloadZipLink: ElementRef;
  SearchUploadStatusForm: FormGroup;
  calendarStartDate: any;
  calendarEndDate: any;
  startDate: string;
  endDate: string;
  batchNumber: any;
  searchResltData: any;
  type: String;
  show = false;
  uploadedFile = 'uploadedFile';
  validFile = 'validFile';
  inValidFile = 'inValidFile';
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private route: ActivatedRoute,
    private router: Router, private spinner: NgxSpinnerService, private fileService: FileServiceService) { }

  ngOnInit(): void {
    this.SearchUploadStatusForm = this.formBuilder.group({
      batchNumber: [''],
      startDate: [''],
      endDate: ['']
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, 'All']],
      processing: true,
      scrollX: true
    };
    this.type = this.route.snapshot.paramMap.get('type');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
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


  searchFileUploadStatus(formContent) {
   // alert(formContent.batchNumber +''+formContent.startDate+''+formContent.endDate);
    var html = '';
    this.batchNumber = formContent.batchNumber;
    this.calendarStartDate = formContent.startDate;
    this.calendarEndDate = formContent.endDate;
    //converting date dd/mm/yyyy
    this.startDate = this.datePipe.transform(this.calendarStartDate, "dd/MM/yyyy");
    this.endDate = this.datePipe.transform(this.calendarEndDate, "dd/MM/yyyy");
    if (this.batchNumber.length == 0 && this.calendarStartDate.length == 0 && this.calendarEndDate.length == 0) {
      html = 'Please Enter Batch Number or Start Date & End Date';
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
      if (this.batchNumber == '' || this.batchNumber == null) {
        this.batchNumber = '';
      }
      if (this.startDate == '' || this.startDate == null) {
        this.startDate = '';
      }
      if (this.endDate == '' || this.endDate == null) {
        this.endDate = '';
      }
      this.show = true;
      this.spinner.show();
      this.fileService.searchFileUploadData(this.batchNumber, this.startDate, this.endDate, this.type).subscribe(data => {
        this.spinner.hide();
       
        if (data.status == 'SUCCESS') {
          this.searchResltData = data.responseData;
          this.rerender();
        }else{
          this.searchResltData = [];
          this.rerender();
        }
      },
        err => {
          this.spinner.hide();
        });
    }

  }

  clearFormData() {
    this.SearchUploadStatusForm = this.formBuilder.group({
      batchNumber: [''],
      startDate: [''],
      endDate: [''],

    })
  }

  public async downloadFile(id, filename, fileType): Promise<void> {

    const blob = await this.fileService.downloadExcelFile(fileType, id);
    if (window.navigator.msSaveOrOpenBlob) //IE & Edge
    {
      //msSaveBlob only available for IE & Edge
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = this.downloadZipLink.nativeElement;
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    }

  }

}
