import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { title: 'Total APIs', value: 143, icon: 'api', color: 'primary' },
    { title: 'Active Gateways', value: 12, icon: 'gateway', color: 'success' },
    { title: 'Public APIs', value: 37, icon: 'public', color: 'accent' },
    { title: 'Recent Updates', value: 24, icon: 'update', color: 'info' }
  ];
  
  recentApis = [
    { name: 'Payment Processing API', description: 'Secure payment processing endpoints', visibility: 'External', versions: ['v1.2', 'v1.1', 'v1.0'] },
    { name: 'User Management API', description: 'User authentication and profile management', visibility: 'Internal', versions: ['v2.0', 'v1.0'] },
    { name: 'Product Catalog API', description: 'Product information and catalog browsing', visibility: 'Public', versions: ['v1.5', 'v1.0'] }
  ];
  
  recentGateways = [
    { name: 'Production Gateway', status: 'Active', apisCount: 78, lastSync: '2025-04-15 14:30' },
    { name: 'Testing Gateway', status: 'Active', apisCount: 45, lastSync: '2025-04-14 09:15' },
    { name: 'Development Gateway', status: 'Inactive', apisCount: 20, lastSync: '2025-04-10 11:45' }
  ];
}