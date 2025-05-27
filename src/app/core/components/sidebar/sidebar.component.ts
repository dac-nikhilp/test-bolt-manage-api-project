import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'API Management',
      icon: 'api',
      route: '/apis',
      children: [
        { label: 'All APIs', route: '/apis' },
        { label: 'Create API', route: '/apis/create' }
      ]
    },
    {
      label: 'Gateway Management',
      icon: 'gateway',
      route: '/gateways',
      children: [
        { label: 'All Gateways', route: '/gateways' },
        { label: 'Sync Gateways', route: '/gateways/sync' }
      ]
    }
  ];
  
  isSidebarCollapsed = false;
  
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}