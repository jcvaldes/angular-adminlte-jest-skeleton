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
  email: string;
  photoURL: any;
  constructor(private sidebar: SidebarService, private authSvc: AuthService) {
    this.menuItems = this.sidebar.menu;
  }

  ngOnInit(): void {
    this.getUserInfo();
    $('[data-widget="treeview"]').Treeview('init');
  }
  async getUserInfo() {
    const user = await this.authSvc.getCurrentUser();
    if (user) {
      this.email = user.email;
      this.photoURL = user.photoURL;
    }
  }
  logout() {
    this.authSvc.logout();
  }
}
