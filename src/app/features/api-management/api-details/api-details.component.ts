import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Api } from '../../../shared/models/api.model';

@Component({
  selector: 'app-api-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4" *ngIf="api">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>{{ api.name }}</h2>
        <button class="btn btn-primary" (click)="onEdit()">Edit API</button>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">API Details</h5>
          <p class="card-text">{{ api.description }}</p>
          <div class="mb-3">
            <strong>Visibility:</strong>
            <span class="badge ms-2" [ngClass]="'badge-' + api.visibility.toLowerCase()">
              {{ api.visibility }}
            </span>
          </div>
          <div class="mb-3">
            <strong>Created:</strong> {{ api.createdAt | date:'medium' }}
          </div>
          <div>
            <strong>Last Updated:</strong> {{ api.updatedAt | date:'medium' }}
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Versions</h5>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Release Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let version of api.versions">
                  <td>{{ version.versionNumber }}</td>
                  <td>{{ version.releaseDate | date }}</td>
                  <td>
                    <span class="badge" [class.bg-danger]="version.deprecated" [class.bg-success]="!version.deprecated">
                      {{ version.deprecated ? 'Deprecated' : 'Active' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Contracts</h5>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let contract of api.contracts">
                  <td>{{ contract.fileName }}</td>
                  <td>{{ contract.contractType }}</td>
                  <td>{{ contract.uploadDate | date }}</td>
                  <td>{{ contract.fileSize | number }} bytes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container-fluid {
      max-width: 1200px;
    }
  `]
})
export class ApiDetailsComponent implements OnInit {
  api: Api | undefined;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getApiById(id).subscribe(api => {
        this.api = api;
      });
    }
  }

  onEdit() {
    if (this.api) {
      this.router.navigate(['/apis/edit', this.api.id]);
    }
  }
}