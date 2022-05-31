import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '@modules/pages/pages.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import(`./modules/auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: '',
    component: PagesComponent,
    loadChildren: () =>
      import(`./modules/pages/pages.module`).then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
