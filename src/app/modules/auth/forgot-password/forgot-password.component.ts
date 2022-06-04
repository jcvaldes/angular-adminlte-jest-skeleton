import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  emailPass: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {}

  async resetPass() {
    try {
      this.emailPass = this.forgotPasswordForm.value.email;
      await this.authSvc.resetPassword(this.emailPass).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Se le envio a su email el link para reseteo',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/auth/login');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}