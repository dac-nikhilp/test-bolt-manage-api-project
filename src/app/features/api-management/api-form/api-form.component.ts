import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ApiVisibility } from '../../../shared/models/api.model';

@Component({
  selector: 'app-api-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid py-4">
      <h2>{{ isEditMode ? 'Edit API' : 'Create New API' }}</h2>
      <form [formGroup]="apiForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="name" class="form-label">API Name</label>
          <input type="text" class="form-control" id="name" formControlName="name">
        </div>
        
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="3" formControlName="description"></textarea>
        </div>
        
        <div class="mb-3">
          <label for="visibility" class="form-label">Visibility</label>
          <select class="form-select" id="visibility" formControlName="visibility">
            <option value="Internal">Internal</option>
            <option value="External">External</option>
            <option value="Public">Public</option>
            <option value="None">None</option>
          </select>
        </div>
        
        <div class="mb-3">
          <label for="contractType" class="form-label">Contract Specification Type</label>
          <select class="form-select" id="contractType" formControlName="contractSpecificationType">
            <option value="OpenAPI">OpenAPI</option>
            <option value="AsyncAPI">AsyncAPI</option>
            <option value="GraphQL">GraphQL</option>
            <option value="WSDL">WSDL</option>
          </select>
        </div>
        
        <div class="mb-3">
          <label for="contract" class="form-label">API Contract (ZIP)</label>
          <input type="file" class="form-control" id="contract" accept=".zip" (change)="onFileSelected($event)">
        </div>
        
        <button type="submit" class="btn btn-primary" [disabled]="apiForm.invalid">
          {{ isEditMode ? 'Update API' : 'Create API' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .container-fluid {
      max-width: 800px;
    }
  `]
})
export class ApiFormComponent implements OnInit {
  apiForm: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apiForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['Internal', Validators.required],
      contractSpecificationType: ['OpenAPI', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.apiService.getApiById(id).subscribe(api => {
        if (api) {
          this.apiForm.patchValue({
            name: api.name,
            description: api.description,
            visibility: api.visibility
          });
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.apiForm.valid) {
      const formData = this.apiForm.value;
      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.apiService.updateApi(id, formData).subscribe(() => {
            this.router.navigate(['/apis']);
          });
        }
      } else {
        this.apiService.createApi(formData).subscribe(() => {
          this.router.navigate(['/apis']);
        });
      }
    }
  }
}