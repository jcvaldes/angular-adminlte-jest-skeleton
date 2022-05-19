import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('password') passwordRef!: ElementRef;
  @ViewChild('togglePassword') togglePasswordRef!: ElementRef;

  loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || 'joaquin@gmail.com',
      [Validators.required, Validators.email],
    ],
    password: ['123456', [Validators.required]],
    remember: [localStorage.getItem('remember') || ''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {}

  async onGoogleLogin() {
    // try {
    //   await this.authSvc.loginGoogle().then(() => {
    //     this.router.navigateByUrl('dashboard');
    //   });
    // } catch (error: any) {
    //   Swal.fire('ERROR', error.message, 'error');
    // }
  }

  async login() {
    try {
      await this.authSvc
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .then((user: any) => {
          this.router.navigateByUrl('/');
          return;
          if (user && user.user.emailVerified) {
          } else if (user) {
            this.router.navigateByUrl('/verificar-email');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'El email o password son incorrectos...',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.value) {
                localStorage.removeItem('email');
                localStorage.removeItem('remember');
                this.loginForm.reset();
              }
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  onCheckboxChhange(e: any) {
    if (
      this.loginForm.value.email === '' ||
      localStorage.getItem('email') === '' ||
      this.loginForm.value.password === null
    ) {
      Swal.fire('ERROR', 'Debe llenar el email', 'error');
      localStorage.removeItem('email');
      localStorage.removeItem('remember');
    } else {
      if (e.target.checked) {
        localStorage.setItem('email', this.loginForm.value.email);
        localStorage.setItem('remember', 'true');
      } else {
        this.loginForm.reset();
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }
    }
  }

  hideShowPass() {
    const inputPass = this.passwordRef.nativeElement;
    const iconEye = this.togglePasswordRef.nativeElement;

    if (inputPass.getAttribute('type') === 'password') {
      inputPass.setAttribute('type', 'text');
      iconEye.classList.remove('fa-eye-slash');
      iconEye.classList.add('fa-eye');
    } else {
      inputPass.setAttribute('type', 'password');
      iconEye.classList.remove('fa-eye');
      iconEye.classList.add('fa-eye-slash');
    }
  }
}
