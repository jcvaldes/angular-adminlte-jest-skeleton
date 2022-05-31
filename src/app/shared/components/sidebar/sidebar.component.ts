import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { MenuItem } from './menu-item.model';
import { SidebarService } from './sidebar.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[];
  user: any;
  constructor(
    private sidebar: SidebarService,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.menuItems = this.sidebar.menu;
  }

  ngOnInit(): void {
    // $('[data-widget="treeview"]').Treeview('init');
  }
  async obtenerUsuario() {
    this.user = await this.authSvc.getCurrentUser();
    // if (this.user) {
    //   this.user = this.usuario.email;
    //   this.userImgGoogle = this.usuario.photoURL;
    // }
  }
  logout() {
    this.authSvc.logout();
  }
}
