import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import {
  SnarbankingDefaultPageTitleStrategy,
  shellFeatureRoutes,
} from '@snarbanking-workspace/shell/feature';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { appReducers } from '@snarbanking-workspace/shared/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      shellFeatureRoutes,
      ...[withEnabledBlockingInitialNavigation(), withComponentInputBinding()]
    ),
    provideStore(appReducers),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideEffects(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: TitleStrategy, useClass: SnarbankingDefaultPageTitleStrategy },
  ],
};
