import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Api, ApiFormData } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private mockApis: Api[] = [
    {
      id: '1',
      name: 'Payment Processing API',
      description: 'Secure payment processing endpoints for credit cards, digital wallets, and ACH transfers.',
      visibility: 'External',
      versions: [
        { id: '1-1', versionNumber: '1.2', releaseDate: new Date('2025-01-15'), deprecated: false },
        { id: '1-2', versionNumber: '1.1', releaseDate: new Date('2024-09-10'), deprecated: false },
        { id: '1-3', versionNumber: '1.0', releaseDate: new Date('2024-05-22'), deprecated: true }
      ],
      contracts: [
        { id: 'c1', fileName: 'payment-api-spec.zip', uploadDate: new Date('2025-01-15'), fileSize: 2048, contractType: 'OpenAPI 3.0' }
      ],
      gatewayIds: ['1', '2'],
      createdAt: new Date('2024-05-22'),
      updatedAt: new Date('2025-01-15'),
      rating: 4.5,
      bookmarked: true
    },
    {
      id: '2',
      name: 'User Management API',
      description: 'User authentication, authorization, profile management, and role-based access control.',
      visibility: 'Internal',
      versions: [
        { id: '2-1', versionNumber: '2.0', releaseDate: new Date('2025-02-28'), deprecated: false },
        { id: '2-2', versionNumber: '1.0', releaseDate: new Date('2024-06-15'), deprecated: true }
      ],
      contracts: [
        { id: 'c2', fileName: 'user-api-spec.zip', uploadDate: new Date('2025-02-28'), fileSize: 1536, contractType: 'OpenAPI 3.0' }
      ],
      gatewayIds: ['1'],
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date('2025-02-28'),
      rating: 4.2
    }
    // ... rest of the mock APIs
  ];

  constructor() { }

  getApis(): Observable<Api[]> {
    return of([...this.mockApis]).pipe(delay(500));
  }

  // ... rest of the service methods
}