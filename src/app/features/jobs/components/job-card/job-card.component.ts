import { Component, inject, input, computed } from '@angular/core';
import { JobOffer } from '../../../../core/models/job.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { selectFavorite, selectIsFavorite } from '../../../favorites/store/favorite.selectors';
import { addFavorite, removeFavorite } from '../../../favorites/store/favorite.actions';
import { FavoriteOffer } from '../../../../core/models/favorite.model';
import {
  addApplication,
  removeApplication,
} from '../../../applications/store/applications.actions';
import {
  selectApplication,
  selectIsAlreadyApplied,
} from '../../../applications/store/applications.selector';
import { Application, Status } from '../../../../core/models/application.model';
import { environement } from '../../../../core/environements/environment.local';

@Component({
  selector: 'app-job-card',
  imports: [DatePipe],
  templateUrl: './job-card.component.html',
})
export class JobCardComponent {
  protected authService = inject(AuthService);
  private readonly store = inject(Store);
  job = input<JobOffer>();

 

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

  isApplied = computed(() => {
    const jobId = this.job()?.id;
    if (!jobId) return false;
    return this.store.selectSignal(selectIsAlreadyApplied(jobId))();
  });

  appliedOffer = computed(() => {
    const jobId = this.job()?.id;
    if (!jobId) return null;
    return this.store.selectSignal(selectApplication(jobId))();
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

  onTrackApplication(): void {
    
   

    const currentUser = this.authService.currentUser();
    if (this.isApplied()) {
      this.store.dispatch(removeApplication({ id: this.appliedOffer()!.id! }));
    } else {
      const newApplication: Application = {
        userId: currentUser?.id!,
        offerId: this.job()!.id,
        apiSource: environement.apiSource,
        title: this.job()!.title,
        company: this.job()!.company,
        location: this.job()!.location,
        status: Status.EN_ATTENTE,
        dateAdded: new Date().toISOString(),
        notes: '',
        url: this.job()!.url,
      };

      this.store.dispatch(addApplication({ application: newApplication }));
    }
  }
}
