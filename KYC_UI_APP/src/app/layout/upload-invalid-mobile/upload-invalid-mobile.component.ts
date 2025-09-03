import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import {FileServiceService} from "../../service/file-service.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-upload-invalid-mobile',
  templateUrl: './upload-invalid-mobile.component.html',
  styleUrls: ['./upload-invalid-mobile.component.css']
})
export class UploadInvalidMobileComponent implements OnInit {
  @ViewChild('downloadZipLink', { static: false }) private downloadZipLink: ElementRef;
  uploadForm: FormGroup;
  uploadType: String = "";
  submitted: boolean;
  formData = new FormData();
  progress: number = 0;
  type:String = "INVALID";
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private fileService : FileServiceService,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.uploadForm = this.formBuilder.group({
      invalidMobFile: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.uploadForm.controls; }

  onFileSelect(event) {
    //this.formData.delete('invalidMobFile');
    //this.formData.delete('uploadType');
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('size', file.size);
      console.log('type', file.type);
      console.log('name', file.name);
      this.formData.append('invalidMobFile', event.target.files[0]);
      //this.uploadForm.get('invalidMobFile').setValue(file);
    }
  }


  onSubmit() {
    this.formData.append('uploadType', 'INVALID');
    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
    }
    this.spinner.show();
    this.fileService.uploadFiles(this.formData).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          this.spinner.hide();
          this.restUplodForm();
          this.submitted = false;
          console.log('File Uploaded Successfully!', event.body);
          if (event.body.status == "SUCCESS") {
            swal.fire({
              icon: 'success',
              title: 'OK!',
              text: 'File Uploaded Successfully. Your Batch Number is '+event.body.responseData,
              allowOutsideClick: false
            })
          }
          else if (event.body.status == "ERROR") {
            swal.fire({
              icon: 'error',
              title: 'Info!',
              text:event.body.errorMessage,
              allowOutsideClick: false

            })
          }
          else if (event.body.status == "INVALID FILE") {
            swal.fire({
              icon: 'error',
              title: 'Info!',
              text:event.body.errorMessage
            })
          } else if(event.body.status == 'HEADER_MISMATCH') {
            swal.fire({
              icon: 'error',
              title: 'Info!',
              text:event.body.errorMessage
            })
          } else if(event.body.status == 'EMPTY_FILE') {
            swal.fire({
              icon: 'error',
              title: 'Info!',
              text:event.body.errorMessage
            })
          } else {
            swal.fire({
              icon: 'error',
              title: 'Info!',
              text:'Error Please Try Again'
            })
          }
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    })
  }

  restUplodForm(){
    this.formData = new FormData();
    this.uploadForm.patchValue({
      invalidMobFile: '',
      uploadType : ''
    });
  }

  async downloadExcel(){
    const blob = await this.fileService.downloadHeaderFileExcelFile();
      let fileName='Mobile_Num_Upload.xlsx';
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

  viewUploadDetails(){
    this.router.navigate(['/viewUploads',this.type]);
  }
}
