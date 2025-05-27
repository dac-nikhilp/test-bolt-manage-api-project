import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api, ApiVisibility } from '../../../shared/models/api.model';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-api-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.scss']
})
export class ApiListComponent implements OnInit {
  apis: Api[] = [];
  filteredApis: Api[] = [];
  visibilityOptions: ApiVisibility[] = ['Internal', 'External', 'Public', 'None'];
  
  // Filter options
  searchTerm: string = '';
  selectedVisibility: string = '';
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.loadApis();
  }

  loadApis(): void {
    this.apiService.getApis().subscribe(apis => {
      this.apis = apis;
      this.filteredApis = [...apis];
    });
  }
  
  applyFilters(): void {
    this.filteredApis = this.apis.filter(api => {
      const matchesSearch = !this.searchTerm || 
        api.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        api.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesVisibility = !this.selectedVisibility || 
        api.visibility === this.selectedVisibility;
      
      return matchesSearch && matchesVisibility;
    });
  }
  
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedVisibility = '';
    this.filteredApis = [...this.apis];
  }
  
  deleteApi(id: string): void {
    if (confirm('Are you sure you want to delete this API?')) {
      this.apiService.deleteApi(id).subscribe(() => {
        this.loadApis();
      });
    }
  }

  toggleBookmark(api: Api, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.apiService.toggleBookmark(api.id).subscribe(updatedApi => {
      if (updatedApi) {
        const index = this.apis.findIndex(a => a.id === api.id);
        if (index !== -1) {
          this.apis[index] = updatedApi;
          this.applyFilters();
        }
      }
    });
  }
}