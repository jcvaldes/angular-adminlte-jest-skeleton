import { Injectable } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        {
          title: 'Usuarios',
          url: '/users',
          icon: 'fa fa-users',
        },
        {
          title: 'Productos',
          url: '/products',
          icon: 'fa fa-cubes',
        },
        {
          title: 'Clientes',
          url: '/customers',
          icon: 'fa fa-user-circle',
        },
      ],
    },
  ];
  constructor() {}
}
