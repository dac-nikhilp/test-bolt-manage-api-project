import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewayService } from '../../../shared/services/gateway.service';
import { Gateway } from '../../../shared/models/gateway.model';

@Component({
  selector: 'app-gateway-sync',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4">
      <h2>Gateway Synchronization</h2>
      <p class="text-muted mb-4">Synchronize and manage API deployments across gateways</p>

      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Sync Status</h5>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Gateway</th>
                  <th>Status</th>
                  <th>Last Sync</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let gateway of gateways">
                  <td>{{ gateway.name }}</td>
                  <td>
                    <span class="badge" [class.bg-success]="gateway.status === 'Active'" [class.bg-secondary]="gateway.status === 'Inactive'">
                      {{ gateway.status }}
                    </span>
                  </td>
                  <td>{{ gateway.lastSyncDate | date:'medium' }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary" (click)="onSyncGateway(gateway.id)"
                      [disabled]="gateway.status === 'Inactive'">
                      Sync Now
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary" (click)="onSyncAll()">
          Sync All Active Gateways
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container-fluid {
      max-width: 1200px;
    }
  `]
})
export class GatewaySyncComponent implements OnInit {
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

  onSyncGateway(gatewayId: string) {
    this.gatewayService.importApis(gatewayId).subscribe(() => {
      this.loadGateways();
    });
  }

  onSyncAll() {
    this.gatewayService.syncGateways().subscribe(() => {
      this.loadGateways();
    });
  }
}