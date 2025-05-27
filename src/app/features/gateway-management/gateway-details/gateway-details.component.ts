import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../../shared/services/gateway.service';
import { Gateway } from '../../../shared/models/gateway.model';

@Component({
  selector: 'app-gateway-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid py-4" *ngIf="gateway">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>{{ gateway.name }}</h2>
        <button class="btn btn-primary" (click)="onSync()">Sync Gateway</button>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Gateway Details</h5>
          <p class="card-text">{{ gateway.description }}</p>
          <div class="mb-3">
            <strong>URL:</strong> {{ gateway.url }}
          </div>
          <div class="mb-3">
            <strong>Status:</strong>
            <span class="badge ms-2" [class.bg-success]="gateway.status === 'Active'" [class.bg-secondary]="gateway.status === 'Inactive'">
              {{ gateway.status }}
            </span>
          </div>
          <div class="mb-3">
            <strong>API Count:</strong> {{ gateway.apiCount }}
          </div>
          <div>
            <strong>Last Sync:</strong> {{ gateway.lastSyncDate | date:'medium' }}
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
export class GatewayDetailsComponent implements OnInit {
  gateway: Gateway | undefined;

  constructor(
    private gatewayService: GatewayService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gatewayService.getGatewayById(id).subscribe(gateway => {
        this.gateway = gateway;
      });
    }
  }

  onSync() {
    if (this.gateway) {
      this.gatewayService.importApis(this.gateway.id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}