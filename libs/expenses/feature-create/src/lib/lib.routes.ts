import { Route } from '@angular/router';
import { ExpensesFeatureCreateComponent } from './expenses-feature-create.component';

export const expensesFeatureCreateRoutes: Route[] = [
  {
    path: '',
    component: ExpensesFeatureCreateComponent,
    title: 'Create Expenses',
  },
];
