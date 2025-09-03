import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyPolicyService } from 'src/app/services/companyPolicyService';
import Swal from 'sweetalert2';

import { AppConstants } from "../../constants/AppConstants";

@Component({
  selector: 'app-companypolicy',
  templateUrl: './companypolicy.component.html',
  styleUrls: ['./companypolicy.component.scss']
})
export class CompanypolicyComponent implements OnInit {

  policyForm: FormGroup;

  isChecked: Boolean;

  constructor(private fb: FormBuilder, private companyPoilcyService: CompanyPolicyService) { }

  ngOnInit(): void {

    this.policyForm = this.fb.group({

      id: [''],
      policyContent: ['', [Validators.required]],
      action: [''],
      status: [''],
      agreementStatus: ['', [Validators.required]]

    })

    this.getCompanyPolicy();

  }

  get validate_policy_form() { return this.policyForm.controls; }

  save(type) {



    if (this.policyForm.valid && type == 'save') {

      this.companyPoilcyService.saveCompanyPolicy(this.policyForm.value).subscribe((data: any) => {

        if (data['status'] == AppConstants.SUCCESS) {

          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {


            } else if (result.isDenied) {

            }
          })

        } else {

          Swal.fire({
            icon: 'error',
            title: '',
            text: data['exceptionMsg'],
          })

        }

      })

    }

    if (this.policyForm.valid && type == 'Accept') {

      this.companyPoilcyService.policyAcceptence().subscribe((data: any) => {

        if (data['status'] == AppConstants.SUCCESS) {

          Swal.fire({
            icon: 'success',
            title: '',
            text: data['msg'],
          }).then((result) => {
            if (result.isConfirmed) {


            } else if (result.isDenied) {

            }
          })

        } else {

          Swal.fire({
            icon: 'error',
            title: '',
            text: data['exceptionMsg'],
          })

        }

      })

    }

  }

  getCompanyPolicy() {

    this.companyPoilcyService.getCompanyPolicy().subscribe((data: any) => {

      this.policyForm.patchValue(data.responseDto[0]);

    })

  }

}
