import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { shellFeatureRoutes } from './lib.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(shellFeatureRoutes, withEnabledBlockingInitialNavigation()),
    provideStore({}),
    provideEffects(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
