import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { shellFeatureRoutes } from './lib.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(shellFeatureRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
