import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { favoritesReducer } from './features/favorites/store/favorite.reducer';
import { FavoriteEffects } from './features/favorites/store/favorite.effects';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { applicationsReducer } from './features/applications/store/applications.reducers';
import { ApplicationEffects } from './features/applications/store/applications.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideStore({ favorites: favoritesReducer , applications : applicationsReducer}),
    provideEffects([FavoriteEffects , ApplicationEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
