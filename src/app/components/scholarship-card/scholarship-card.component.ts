import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scholarship } from '../../models/scholarship.model';

@Component({
  selector: 'app-scholarship-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scholarship-card.component.html',
  styleUrls: ['./scholarship-card.component.scss']
})
export class ScholarshipCardComponent {
  @Input() scholarship!: Scholarship;
  @Output() viewDetails = new EventEmitter<Scholarship>();

  onViewDetails(): void {
    this.viewDetails.emit(this.scholarship);
  }

  formatAmount(scholarship: Scholarship): string {
    if (scholarship.isFullFunding) return 'Full Funding';
    if (scholarship.amount === null) return 'Full Funding';
    return '$' + scholarship.amount.toLocaleString('en-US');
  }
}
