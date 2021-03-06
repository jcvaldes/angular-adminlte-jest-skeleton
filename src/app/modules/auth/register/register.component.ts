import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
  onRegister() {
    this.authSvc
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .then((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Gracias por registrarse',
          text: `Se le envió un email de verificación a ${resp.user.email}`,
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.value) {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
            this.router.navigateByUrl('/auth/login');
          }
        });
      })
      .catch((error) => {
        Swal.fire('ERROR', 'La cuenta ya esta uso', 'error');
        this.registerForm.reset();
      });
  }
}
