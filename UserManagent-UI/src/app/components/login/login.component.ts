import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/AppConstants';
import Swal from 'sweetalert2';
import { LoginService } from "../../services/loginService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      username: ['', [Validators.required]],
      password: ['', [Validators.required]]

    })

  }

  login() {

    if (this.loginForm.valid) {

      this.loginService.login(this.loginForm.value).subscribe((data: any) => {

        console.log(JSON.stringify(data));
        
        if (data.status == AppConstants.SUCCESS) {

          localStorage.setItem('token', data.jwttoken);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem('roleName', data.roleName);
          localStorage.setItem('userId', data.userId);

          if (data.roleName == AppConstants.MANAGER) {

            this.router.navigateByUrl('dashboard/mg-dashboard');

          }
          if (data.roleName == AppConstants.ADMIN) {

            this.router.navigateByUrl('/dashboard');

          }

          if (data.roleName == AppConstants.USER) {

            this.router.navigateByUrl('dashboard/user-dashboard');

          }

          if (data.roleName == AppConstants.IT_SUPPORT) {

            this.router.navigateByUrl('dashboard/it-support-dashboard');

          }


        }
        else {
          Swal.fire('', 'Invalid UserName / Password', 'warning');
        }

      })

    }

  }

  get login_form_validate() {

    return this.loginForm.controls;

  }

}
