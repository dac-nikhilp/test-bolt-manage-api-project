import { Routes } from '@angular/router';

export const GATEWAY_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./gateway-list/gateway-list.component').then(c => c.GatewayListComponent),
    title: 'Gateway List'
  },
  {
    path: 'sync',
    loadComponent: () => import('./gateway-sync/gateway-sync.component').then(c => c.GatewaySyncComponent),
    title: 'Sync Gateways'
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./gateway-details/gateway-details.component').then(c => c.GatewayDetailsComponent),
    title: 'Gateway Details'
  }
];