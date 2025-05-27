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
        { id: '1-1', versionNumber: 'v1.2', releaseDate: new Date('2025-01-15'), deprecated: false },
        { id: '1-2', versionNumber: 'v1.1', releaseDate: new Date('2024-09-10'), deprecated: false },
        { id: '1-3', versionNumber: 'v1.0', releaseDate: new Date('2024-05-22'), deprecated: true }
      ],
      contracts: [
        { id: 'c1', fileName: 'payment-api-spec.zip', uploadDate: new Date('2025-01-15'), fileSize: 2048, contractType: 'OpenAPI 3.0' }
      ],
      gatewayIds: ['1', '2'],
      createdAt: new Date('2024-05-22'),
      updatedAt: new Date('2025-01-15')
    },
    {
      id: '2',
      name: 'User Management API',
      description: 'User authentication, authorization, profile management, and role-based access control.',
      visibility: 'Internal',
      versions: [
        { id: '2-1', versionNumber: 'v2.0', releaseDate: new Date('2025-02-28'), deprecated: false },
        { id: '2-2', versionNumber: 'v1.0', releaseDate: new Date('2024-06-15'), deprecated: true }
      ],
      contracts: [
        { id: 'c2', fileName: 'user-api-spec.zip', uploadDate: new Date('2025-02-28'), fileSize: 1536, contractType: 'OpenAPI 3.0' }
      ],
      gatewayIds: ['1'],
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date('2025-02-28')
    },
    {
      id: '3',
      name: 'Product Catalog API',
      description: 'Product information, catalog browsing, and inventory status for e-commerce applications.',
      visibility: 'Public',
      versions: [
        { id: '3-1', versionNumber: 'v1.5', releaseDate: new Date('2025-03-10'), deprecated: false },
        { id: '3-2', versionNumber: 'v1.0', releaseDate: new Date('2024-07-05'), deprecated: false }
      ],
      contracts: [
        { id: 'c3', fileName: 'catalog-api-spec.zip', uploadDate: new Date('2025-03-10'), fileSize: 3072, contractType: 'OpenAPI 3.0' }
      ],
      gatewayIds: ['1', '3'],
      createdAt: new Date('2024-07-05'),
      updatedAt: new Date('2025-03-10')
    },
    {
      id: '4',
      name: 'Analytics API',
      description: 'User behavior tracking, reporting, and analytics for business intelligence.',
      visibility: 'Internal',
      versions: [
        { id: '4-1', versionNumber: 'v1.0', releaseDate: new Date('2025-01-20'), deprecated: false }
      ],
      contracts: [
        { id: 'c4', fileName: 'analytics-api-spec.zip', uploadDate: new Date('2025-01-20'), fileSize: 1024, contractType: 'GraphQL' }
      ],
      gatewayIds: ['2'],
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-20')
    },
    {
      id: '5',
      name: 'Notification Service API',
      description: 'Multi-channel notification delivery including email, SMS, and push notifications.',
      visibility: 'External',
      versions: [
        { id: '5-1', versionNumber: 'v2.1', releaseDate: new Date('2025-03-15'), deprecated: false },
        { id: '5-2', versionNumber: 'v2.0', releaseDate: new Date('2024-11-30'), deprecated: false },
        { id: '5-3', versionNumber: 'v1.0', releaseDate: new Date('2024-08-12'), deprecated: true }
      ],
      contracts: [
        { id: 'c5', fileName: 'notification-api-spec.zip', uploadDate: new Date('2025-03-15'), fileSize: 2560, contractType: 'AsyncAPI 2.0' }
      ],
      gatewayIds: ['1', '3'],
      createdAt: new Date('2024-08-12'),
      updatedAt: new Date('2025-03-15')
    },
    {
      id: '6',
      name: 'Shipping API',
      description: 'Integration with multiple shipping carriers for rate calculation and shipment tracking.',
      visibility: 'External',
      versions: [
        { id: '6-1', versionNumber: 'v1.3', releaseDate: new Date('2025-02-10'), deprecated: false },
        { id: '6-2', versionNumber: 'v1.2', releaseDate: new Date('2024-10-05'), deprecated: false },
        { id: '6-3', versionNumber: 'v1.1', releaseDate: new Date('2024-07-18'), deprecated: true },
        { id: '6-4', versionNumber: 'v1.0', releaseDate: new Date('2024-05-01'), deprecated: true }
      ],
      contracts: [
        { id: 'c6', fileName: 'shipping-api-spec.zip', uploadDate: new Date('2025-02-10'), fileSize: 4096, contractType: 'OpenAPI 3.0' }
      ],
      gatewayIds: ['2', '3'],
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date('2025-02-10')
    }
  ];

  constructor() { }

  getApis(): Observable<Api[]> {
    return of([...this.mockApis]).pipe(delay(500));
  }

  getApiById(id: string): Observable<Api | undefined> {
    const api = this.mockApis.find(api => api.id === id);
    return of(api).pipe(delay(300));
  }

  createApi(apiData: ApiFormData): Observable<Api> {
    const newId = (this.mockApis.length + 1).toString();
    const now = new Date();
    
    const newApi: Api = {
      id: newId,
      name: apiData.name,
      description: apiData.description,
      visibility: apiData.visibility,
      versions: [
        { id: `${newId}-1`, versionNumber: 'v1.0', releaseDate: now, deprecated: false }
      ],
      contracts: [],
      gatewayIds: apiData.gatewayIds || [],
      createdAt: now,
      updatedAt: now
    };
    
    this.mockApis.push(newApi);
    return of(newApi).pipe(delay(500));
  }

  updateApi(id: string, apiData: ApiFormData): Observable<Api | undefined> {
    const index = this.mockApis.findIndex(api => api.id === id);
    
    if (index !== -1) {
      const updatedApi = {
        ...this.mockApis[index],
        name: apiData.name,
        description: apiData.description,
        visibility: apiData.visibility,
        gatewayIds: apiData.gatewayIds || this.mockApis[index].gatewayIds,
        updatedAt: new Date()
      };
      
      this.mockApis[index] = updatedApi;
      return of(updatedApi).pipe(delay(500));
    }
    
    return of(undefined).pipe(delay(300));
  }

  deleteApi(id: string): Observable<boolean> {
    const initialLength = this.mockApis.length;
    this.mockApis = this.mockApis.filter(api => api.id !== id);
    
    return of(initialLength > this.mockApis.length).pipe(delay(500));
  }

  uploadContract(apiId: string, file: File, contractType: string): Observable<boolean> {
    const api = this.mockApis.find(api => api.id === apiId);
    
    if (api) {
      const newContract = {
        id: `c${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date(),
        fileSize: file.size,
        contractType
      };
      
      api.contracts.push(newContract);
      api.updatedAt = new Date();
      
      return of(true).pipe(delay(1000));
    }
    
    return of(false).pipe(delay(500));
  }
}