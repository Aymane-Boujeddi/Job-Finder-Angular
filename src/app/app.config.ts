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
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { favoritesReducer } from './features/favorites/store/favorite.reducer';
import { FavoriteEffects } from './features/favorites/store/favorite.effects';
import { apiInterceptor } from './core/interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor , apiInterceptor])),
    provideStore({ favorites: favoritesReducer }),
    provideEffects([FavoriteEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
