import { Component, inject, input, computed } from '@angular/core';
import { JobOffer } from '../../../../core/models/job.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { selectFavorite, selectIsFavorite } from '../../../favorites/store/favorite.selectors';
import { addFavorite, removeFavorite } from '../../../favorites/store/favorite.actions';
import { FavoriteOffer } from '../../../../core/models/favorite.model';

@Component({
  selector: 'app-job-card',
  imports: [DatePipe],
  templateUrl: './job-card.component.html',
})
export class JobCardComponent {
  protected authService = inject(AuthService);
  private readonly store = inject(Store);
  job = input<JobOffer>();

  // Reactive computed signals that update when job() changes
  isFavorite = computed(() => {
    const jobId = this.job()?.id;
    if (!jobId) return false;
    return this.store.selectSignal(selectIsFavorite(jobId))();
  });

  favoriteOffer = computed(() => {
    const jobId = this.job()?.id;
    if (!jobId) return null;
    return this.store.selectSignal(selectFavorite(jobId))();
  });

  onAddToFavorites(): void {
    const currentUser = this.authService.currentUser();
    if (this.isFavorite()) {
      this.store.dispatch(removeFavorite({ id: this.favoriteOffer()!.id! }));
    } else {
      const newFavorite: FavoriteOffer = {
        userId: currentUser?.id!,
        offerId: this.job()!.id,
        title: this.job()!.title,
        company: this.job()!.company,
        location: this.job()!.location,
      };

      this.store.dispatch(addFavorite({ favorite: newFavorite }));
    }
  }

  onTrackApplication(): void {}
}
