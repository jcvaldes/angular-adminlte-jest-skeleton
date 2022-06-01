import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' },
    loadChildren: () =>
      import('@modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'users',
    data: { title: 'Usuarios' },
    loadChildren: () =>
      import('@modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'products',
    data: { title: 'Productos' },
    loadChildren: () =>
      import('@modules/products/products.module').then((m) => m.ProductsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
