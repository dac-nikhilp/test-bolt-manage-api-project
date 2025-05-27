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
        { id: `${newId}-1`, versionNumber: '1.0', releaseDate: now, deprecated: false }
      ],
      contracts: [],
      gatewayIds: apiData.gatewayIds || [],
      createdAt: now,
      updatedAt: now,
      rating: 0,
      bookmarked: false
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

  toggleBookmark(id: string): Observable<Api | undefined> {
    const api = this.mockApis.find(api => api.id === id);
    if (api) {
      api.bookmarked = !api.bookmarked;
      return of(api).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
  }

  updateRating(id: string, rating: number): Observable<Api | undefined> {
    const api = this.mockApis.find(api => api.id === id);
    if (api) {
      api.rating = rating;
      return of(api).pipe(delay(300));
    }
    return of(undefined).pipe(delay(300));
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