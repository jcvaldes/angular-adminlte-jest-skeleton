import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersPageComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
