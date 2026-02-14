import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import * as ApplicationActions from './applications.actions';
import { catchError, map, mergeMap, exhaustMap, of } from 'rxjs';

@Injectable()
export class ApplicationEffects {
  private actions$ = inject(Actions);
  private applicationService = inject(ApplicationService);
  private authService = inject(AuthService);

  loadApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.loadApplications),

      mergeMap(() => {
        const currentUser = this.authService.currentUser;
        return this.applicationService.getApplications(currentUser()?.id!).pipe(
          map((applications) => { 
            // console.log(applications);
            return ApplicationActions.loadApplicationsSuccess({ applications })}),
          catchError((error) =>
            of(
              ApplicationActions.loadApplicationsFailure({
                error: error.message || 'Failed to load Applications',
              }),
            ),
          ),
        );
      }),
    ),
  );

  addApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.addApplication),
      exhaustMap(({ application }) =>
        this.applicationService.addApplication(application).pipe(
          map((application) => ApplicationActions.addApplicationSuccess({ application })),
          catchError((error) =>
            of(
              ApplicationActions.addApplicationFailure({
                error: error.message || 'Failed to add application',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  removeApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.removeApplication),
      mergeMap(({ id }) =>
        this.applicationService.deleteApplication(id).pipe(
          map(() => ApplicationActions.removeApplicationSuccess({ id })),
          catchError((error) =>
            of(
              ApplicationActions.removeApplicationFailure({
                error: error.message || 'Failed to remove application',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.updateApplication),
      mergeMap(({ id, changes }) =>
        this.applicationService.updateApplication(id, changes).pipe(
          map((application) => ApplicationActions.updateApplicationSuccess({ application })),
          catchError((error) =>
            of(
              ApplicationActions.updateApplicationFailure({
                error: error.message || 'Failed to update application',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
