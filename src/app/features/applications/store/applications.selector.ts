import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApplicationState } from './applications.reducers';

export const selectApplicationsState = createFeatureSelector<ApplicationState>('applications');

export const selectAllApplications = createSelector(
  selectApplicationsState,
  (state) => state.applications,
);

export const selectApplicationsLoading = createSelector(
  selectApplicationsState,
  (state) => state.isLoading,
);

export const selectApplicationsError = createSelector(
  selectApplicationsState,
  (state) => state.error,
);

export const selectIsAlreadyApplied = (offerId: string) =>
  createSelector(selectAllApplications, (applications) =>
    applications.some((app) => app.offerId === offerId),
  );

export const selectApplication = (offerId: string) =>
  createSelector(selectAllApplications, (applications) =>
    applications.find((app) => app.offerId === offerId),
  );
