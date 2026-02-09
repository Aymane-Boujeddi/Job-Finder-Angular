import { Component, EventEmitter, input, output } from '@angular/core';
import { JobCardComponent } from '../../../../shared/components/job-card/job-card.component';
import { JobOffer } from '../../../../core/models/job.model';

@Component({
  selector: 'app-search-results',
  imports: [JobCardComponent],
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent {
  jobsList = input<JobOffer[]>([]);

  currentPage = input<number>(0);
  totalPages = input<number>(0);

  next = output<void>();
  previous = output<void>();

  previousPage() : void {
    this.previous.emit();
  }
  
  nextPage() : void {
    console.log("next page");
    this.next.emit();
  }
}
