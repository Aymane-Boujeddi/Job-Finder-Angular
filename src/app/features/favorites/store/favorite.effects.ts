import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FavoriteActions from './favorite.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FavoritesService } from '../../../core/services/favorites.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class FavoriteEffects {
  private readonly actions$ = inject(Actions);
    private readonly favoritesService = inject(FavoritesService);
  private readonly authService = inject(AuthService);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),

      mergeMap(() => {
        const userId = this.authService.currentUser()!.id!;
        return this.favoritesService.getFavorites(userId).pipe(
          map((favorites) => {
            // console.log(favorites);
            return FavoriteActions.loadFavoritesSuccess({ favorites });
          }),
          catchError((error) =>
            of(
              FavoriteActions.loadFavoritesFailure({
                error: error.message || 'Failed to load Favorites',
              }),
            ),
          ),
        );
      }),
    ),
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.addFavorite),

      mergeMap(({ favorite }) =>
        this.favoritesService.addFavorite(favorite).pipe(
          map((favorite) => FavoriteActions.addFavoriteSuccess({ favorite })),
          catchError((error) =>
            of(
              FavoriteActions.addFavoriteFailure({
                error: error.message || 'Failed to add favorite',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.removeFavorite),
      mergeMap(({ id }) =>
        this.favoritesService.removeFavorite(id).pipe(
          map(() => FavoriteActions.removeFavoriteSuccess({ id })),
          catchError((error) =>
            of(
              FavoriteActions.removeFavoriteFailure({
                error: error.message || 'Failed to remove favorite',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}


