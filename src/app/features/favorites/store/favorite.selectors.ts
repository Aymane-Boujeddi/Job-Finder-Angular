import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorite.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(selectFavoritesState, (state) => state.favorites);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state) => state.loading,
);
export const selectFavorite = (offerId: string) =>
  createSelector(selectAllFavorites, (favorites) => favorites.find((f) => f.offerId === offerId));

export const selectFavoritesError = createSelector(selectFavoritesState, (state) => state.error);

export const selectIsFavorite = (offerId: string) =>
  createSelector(selectAllFavorites, (favorites) => favorites.some((f) => f.offerId === offerId));
