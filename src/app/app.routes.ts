import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent),
    title: 'Dashboard'
  },
  {
    path: 'apis',
    loadChildren: () => import('./features/api-management/api-management.routes').then(r => r.API_MANAGEMENT_ROUTES),
    title: 'API Management'
  },
  {
    path: 'gateways',
    loadChildren: () => import('./features/gateway-management/gateway-management.routes').then(r => r.GATEWAY_MANAGEMENT_ROUTES),
    title: 'Gateway Management'
  },
  {
    path: '**',
    redirectTo: ''
  }
];