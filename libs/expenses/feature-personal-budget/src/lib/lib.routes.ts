import { Route } from '@angular/router';
import { ExpensesFeaturePersonalBudgetComponent } from './expenses-feature-personal-budget.component';

export const expensesFeaturePersonalBudgetRoutes: Route[] = [
  {
    path: '',
    component: ExpensesFeaturePersonalBudgetComponent,
    title: 'budget',
  },
];
