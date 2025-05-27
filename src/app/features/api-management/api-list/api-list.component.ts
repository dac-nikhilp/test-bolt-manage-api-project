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
    this.apiService.getApis().subscribe(apis => {
      this.apis = apis;
      this.filteredApis = [...apis];
    });
  }
  
  applyFilters(): void {
    this.filteredApis = this.apis.filter(api => {
      // Apply search filter
      const matchesSearch = !this.searchTerm || 
        api.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        api.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Apply visibility filter
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
  
  deleteApi(id: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this API?')) {
      this.apiService.deleteApi(id).subscribe(() => {
        this.apis = this.apis.filter(api => api.id !== id);
        this.filteredApis = this.filteredApis.filter(api => api.id !== id);
      });
    }
  }
}