import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[];
  constructor(private sidebar: SidebarService, private router: Router) {
    this.menuItems = this.sidebar.menu;
  }

  ngOnInit(): void {}
  logout() {
    this.router.navigateByUrl('/auth/login');
  }
}
