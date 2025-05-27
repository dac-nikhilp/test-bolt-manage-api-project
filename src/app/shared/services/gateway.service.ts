import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Gateway } from '../models/gateway.model';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private mockGateways: Gateway[] = [
    {
      id: '1',
      name: 'Production Gateway',
      description: 'Main production API gateway for external services',
      url: 'https://api.example.com',
      status: 'Active',
      apiCount: 78,
      lastSyncDate: new Date('2025-04-15T14:30:00')
    },
    {
      id: '2',
      name: 'Testing Gateway',
      description: 'Pre-production testing environment for API validation',
      url: 'https://test-api.example.com',
      status: 'Active',
      apiCount: 45,
      lastSyncDate: new Date('2025-04-14T09:15:00')
    },
    {
      id: '3',
      name: 'Development Gateway',
      description: 'Development environment for API prototyping',
      url: 'https://dev-api.example.com',
      status: 'Inactive',
      apiCount: 20,
      lastSyncDate: new Date('2025-04-10T11:45:00')
    }
  ];

  constructor() { }

  getGateways(): Observable<Gateway[]> {
    return of([...this.mockGateways]).pipe(delay(500));
  }

  getGatewayById(id: string): Observable<Gateway | undefined> {
    const gateway = this.mockGateways.find(gateway => gateway.id === id);
    return of(gateway).pipe(delay(300));
  }

  syncGateways(): Observable<boolean> {
    // Simulate gateway synchronization
    this.mockGateways.forEach(gateway => {
      gateway.lastSyncDate = new Date();
    });
    
    return of(true).pipe(delay(2000));
  }

  importApis(gatewayId: string): Observable<boolean> {
    const gateway = this.mockGateways.find(gateway => gateway.id === gatewayId);
    
    if (gateway) {
      gateway.apiCount += 5; // Just for simulation
      gateway.lastSyncDate = new Date();
      return of(true).pipe(delay(1500));
    }
    
    return of(false).pipe(delay(500));
  }

  updateGatewayStatus(id: string, status: 'Active' | 'Inactive'): Observable<Gateway | undefined> {
    const gateway = this.mockGateways.find(gateway => gateway.id === id);
    
    if (gateway) {
      gateway.status = status;
      return of(gateway).pipe(delay(500));
    }
    
    return of(undefined).pipe(delay(300));
  }
}