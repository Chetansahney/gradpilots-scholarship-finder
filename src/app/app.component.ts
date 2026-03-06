import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterState, DEFAULT_FILTER } from './models/scholarship.model';
import { ScholarshipService } from './services/scholarship.service';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { ScholarshipListComponent } from './components/scholarship-list/scholarship-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FilterSidebarComponent, ScholarshipListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gradpilots-scholarship-finder';

  currentFilters: FilterState = { ...DEFAULT_FILTER };

  stats = { total: 0, fullFunding: 0, deadlinesThisQuarter: 0 };

  constructor(private scholarshipService: ScholarshipService) {}

  ngOnInit(): void {
    this.updateStats();
  }

  onFiltersApplied(filters: FilterState): void {
    this.currentFilters = { ...filters };
    this.updateStats();
  }

  private updateStats(): void {
    const scholarships = this.scholarshipService.getFilteredAndSorted(this.currentFilters, 'relevance');
    this.stats = this.scholarshipService.getStats(scholarships);
  }
}
