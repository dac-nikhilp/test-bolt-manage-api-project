import { Routes } from '@angular/router';

export const API_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./api-list/api-list.component').then(c => c.ApiListComponent),
    title: 'API List'
  },
  {
    path: 'create',
    loadComponent: () => import('./api-form/api-form.component').then(c => c.ApiFormComponent),
    title: 'Create API'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./api-form/api-form.component').then(c => c.ApiFormComponent),
    title: 'Edit API'
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./api-details/api-details.component').then(c => c.ApiDetailsComponent),
    title: 'API Details'
  }
];