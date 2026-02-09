import { Component, input, Input } from '@angular/core';
import { JobOffer } from '../../../core/models/job.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-card',
  imports: [DatePipe],
  templateUrl: './job-card.component.html',
})
export class JobCardComponent {
  job = input<JobOffer>();
  isAuthenticated = false; 

  onAddToFavorites(): void {}

  onTrackApplication(): void {}
}
