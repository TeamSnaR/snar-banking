import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import { shellFeatureRoutes } from '@snarbanking-workspace/shell/feature';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(shellFeatureRoutes, withEnabledBlockingInitialNavigation()),
    provideStore({}),
    provideEffects(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
