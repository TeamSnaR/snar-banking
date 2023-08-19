import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ExpensesEffects } from '@snarbanking-workspace/expenses/data-access';
import * as fromExpenses from '@snarbanking-workspace/expenses/data-access';

export const expensesFeatureShellRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-view').then(
            (m) => m.expensesFeatureViewRoutes
          ),
      },
      {
        path: ':id/details',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-details').then(
            (m) => m.expensesFeatureDetailsRoutes
          ),
      },
      {
        path: ':id/manage',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-manage').then(
            (m) => m.expensesFeatureManageRoutes
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-create').then(
            (m) => m.expensesFeatureCreateRoutes
          ),
      },
    ],
    providers: [
      provideState(
        fromExpenses.EXPENSES_FEATURE_KEY,
        fromExpenses.expensesReducer
      ),
      provideEffects(ExpensesEffects),
    ],
  },
];
