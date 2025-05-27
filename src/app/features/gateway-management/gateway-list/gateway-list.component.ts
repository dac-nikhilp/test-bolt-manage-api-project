import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GatewayService } from '../../../shared/services/gateway.service';
import { Gateway } from '../../../shared/models/gateway.model';

@Component({
  selector: 'app-gateway-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container-fluid py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Gateway Management</h2>
          <p class="text-muted">Manage and monitor your API gateways</p>
        </div>
        <div>
          <button class="btn btn-primary me-2" (click)="onSyncAll()">
            Sync All Gateways
          </button>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-6 col-xl-4" *ngFor="let gateway of gateways">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">{{ gateway.name }}</h5>
              <span class="badge" [class.bg-success]="gateway.status === 'Active'" [class.bg-secondary]="gateway.status === 'Inactive'">
                {{ gateway.status }}
              </span>
            </div>
            <div class="card-body">
              <p class="card-text">{{ gateway.description }}</p>
              <div class="mb-3">
                <strong>URL:</strong> {{ gateway.url }}
              </div>
              <div class="mb-3">
                <strong>APIs:</strong> {{ gateway.apiCount }}
              </div>
              <div>
                <strong>Last Sync:</strong> {{ gateway.lastSyncDate | date:'medium' }}
              </div>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-primary" (click)="onImportApis(gateway.id)">
                  Import APIs
                </button>
                <button class="btn btn-sm" [class.btn-success]="gateway.status === 'Inactive'" [class.btn-danger]="gateway.status === 'Active'"
                  (click)="onToggleStatus(gateway)">
                  {{ gateway.status === 'Active' ? 'Deactivate' : 'Activate' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container-fluid {
      max-width: 1400px;
    }
  `]
})
export class GatewayListComponent implements OnInit {
  gateways: Gateway[] = [];

  constructor(private gatewayService: GatewayService) {}

  ngOnInit() {
    this.loadGateways();
  }

  loadGateways() {
    this.gatewayService.getGateways().subscribe(gateways => {
      this.gateways = gateways;
    });
  }

  onSyncAll() {
    this.gatewayService.syncGateways().subscribe(() => {
      this.loadGateways();
    });
  }

  onImportApis(gatewayId: string) {
    this.gatewayService.importApis(gatewayId).subscribe(() => {
      this.loadGateways();
    });
  }

  onToggleStatus(gateway: Gateway) {
    const newStatus = gateway.status === 'Active' ? 'Inactive' : 'Active';
    this.gatewayService.updateGatewayStatus(gateway.id, newStatus).subscribe(() => {
      this.loadGateways();
    });
  }
}