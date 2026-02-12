import { createReducer, on } from '@ngrx/store';
import { FavoriteOffer } from '../../../core/models/favorite.model';
import * as FavoriteActions from './favorite.actions';

export interface FavoritesState {
  favorites: FavoriteOffer[];
  loading: boolean;
  error: string | null;
}

export const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const favoritesReducer = createReducer(
  initialState,

  on(FavoriteActions.loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FavoriteActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
    loading: false,
    error: null,
  })),
  on(FavoriteActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(FavoriteActions.addFavorite, (state, { favorite }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FavoriteActions.addFavoriteSuccess, (state, { favorite }) => ({
    ...state,
    loading: false,
    favorites: [...state.favorites, favorite],
    error: null,
  })),
  on(FavoriteActions.addFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(FavoriteActions.removeFavorite, (state, { id }) => ({
    ...state,
    loading: true,
  })),
  on(FavoriteActions.removeFavoriteSuccess, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter((fav) => fav.id !== id),
    loading: false,
    error: null,
  })),
  on(FavoriteActions.removeFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);
