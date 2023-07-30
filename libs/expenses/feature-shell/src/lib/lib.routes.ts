import { Route } from '@angular/router';

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
        path: ':id',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-details').then(
            (m) => m.expensesFeatureDetailsRoutes
          ),
      },
    ],
  },
];
