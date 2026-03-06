import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Scholarship, ViewMode, SortOption, FilterState, DEFAULT_FILTER } from '../../models/scholarship.model';
import { ScholarshipService } from '../../services/scholarship.service';
import { ScholarshipCardComponent } from '../scholarship-card/scholarship-card.component';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-scholarship-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ScholarshipCardComponent],
  templateUrl: './scholarship-list.component.html',
  styleUrls: ['./scholarship-list.component.scss']
})
export class ScholarshipListComponent implements OnChanges {
  @Input() filters!: FilterState;

  viewMode: ViewMode = 'cards';
  sortBy: SortOption = 'relevance';

  allScholarships: Scholarship[] = [];
  displayedCount = PAGE_SIZE;

  constructor(private scholarshipService: ScholarshipService) {
    this.loadScholarships();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.displayedCount = PAGE_SIZE;
      this.loadScholarships();
    }
  }

  loadScholarships(): void {
    const activeFilters = this.filters ?? DEFAULT_FILTER;
    this.allScholarships = this.scholarshipService.getFilteredAndSorted(activeFilters, this.sortBy);
  }

  get displayedScholarships(): Scholarship[] {
    return this.allScholarships.slice(0, this.displayedCount);
  }

  get hasMore(): boolean {
    return this.displayedCount < this.allScholarships.length;
  }

  onSortChange(): void {
    this.displayedCount = PAGE_SIZE;
    this.loadScholarships();
  }

  setView(mode: ViewMode): void {
    this.viewMode = mode;
  }

  loadMore(): void {
    this.displayedCount = Math.min(this.displayedCount + PAGE_SIZE, this.allScholarships.length);
  }

  onViewDetails(scholarship: Scholarship): void {
    const amount = scholarship.isFullFunding ? 'Full Funding' : '$' + scholarship.amount?.toLocaleString();
    alert(
      'Scholarship: ' + scholarship.name +
      '\n\nCountry: ' + scholarship.country + ' ' + scholarship.countryFlag +
      '\nStream: ' + scholarship.stream + ' | Level: ' + scholarship.level +
      '\nDeadline: ' + scholarship.deadline +
      '\nAmount: ' + amount +
      '\n\n' + scholarship.description
    );
  }

  formatAmount(scholarship: Scholarship): string {
    if (scholarship.isFullFunding || scholarship.amount === null) return 'Full Funding';
    return '$' + scholarship.amount.toLocaleString('en-US');
  }

  getMapGroups(): { country: string; flag: string; count: number; scholarships: Scholarship[] }[] {
    const groups: { [key: string]: { flag: string; scholarships: Scholarship[] } } = {};
    this.allScholarships.forEach(s => {
      if (!groups[s.country]) {
        groups[s.country] = { flag: s.countryFlag, scholarships: [] };
      }
      groups[s.country].scholarships.push(s);
    });
    return Object.entries(groups).map(([country, data]) => ({
      country,
      flag: data.flag,
      count: data.scholarships.length,
      scholarships: data.scholarships
    }));
  }
}
