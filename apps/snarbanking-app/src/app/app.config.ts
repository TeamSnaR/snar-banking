import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import { expensesReducer } from '@snarbanking-workspace/expenses/feature-view';
import { shellFeatureRoutes } from '@snarbanking-workspace/shell/feature';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(shellFeatureRoutes, withEnabledBlockingInitialNavigation()),
    provideStore({ expenses: expensesReducer }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
