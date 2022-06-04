import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SendEmailComponent,
    ForgotPasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AuthModule {}
