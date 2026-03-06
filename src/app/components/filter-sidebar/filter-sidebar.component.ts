import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterState } from '../../models/scholarship.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  @Output() filtersApplied = new EventEmitter<FilterState>();

  countries = ['USA', 'UK', 'Canada', 'Germany', 'France'];
  streams = ['Business', 'Law', 'IR', 'STEM'];
  levels = ['UG', 'PG', 'PhD'];
  months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  selectedCountries: { [key: string]: boolean } = {};
  selectedStreams: { [key: string]: boolean } = {};
  selectedLevels: { [key: string]: boolean } = {};
  selectedDeadline: string = '';

  ngOnInit(): void {
    this.resetAll();
  }

  resetAll(): void {
    this.countries.forEach(c => this.selectedCountries[c] = true);
    this.streams.forEach(s => this.selectedStreams[s] = true);
    this.levels.forEach(l => this.selectedLevels[l] = true);
    this.selectedDeadline = '';
  }

  onReset(): void {
    this.resetAll();
    this.emitFilters();
  }

  onApply(): void {
    this.emitFilters();
  }

  private emitFilters(): void {
    const filters: FilterState = {
      countries: this.countries.filter(c => this.selectedCountries[c]),
      streams: this.streams.filter(s => this.selectedStreams[s]),
      levels: this.levels.filter(l => this.selectedLevels[l]),
      deadline: this.selectedDeadline || null
    };
    this.filtersApplied.emit(filters);
  }
}
