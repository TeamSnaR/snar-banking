import { Route } from '@angular/router';
import { ShellFeatureComponent } from './shell-feature.component';

export const shellFeatureRoutes: Route[] = [
  {
    path: '',
    component: ShellFeatureComponent,
    children: [
      {
        path: 'expenses',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-view').then(
            (m) => m.expensesFeatureViewRoutes
          ),
      },
      {
        path: 'expenses/:id',
        loadChildren: () =>
          import('@snarbanking-workspace/expenses/feature-details').then(
            (m) => m.expensesFeatureDetailsRoutes
          ),
      },
    ],
  },
];
