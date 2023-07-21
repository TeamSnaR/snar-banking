import { Route } from '@angular/router';
import { ExpensesFeatureViewComponent } from './expenses-feature-view.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromExpenses from '@snarbanking-workspace/expenses/data-access';
import { ExpensesEffects } from '@snarbanking-workspace/expenses/data-access';
export const expensesFeatureViewRoutes: Route[] = [
  {
    path: '',
    component: ExpensesFeatureViewComponent,
    providers: [
      provideState(
        fromExpenses.EXPENSES_FEATURE_KEY,
        fromExpenses.expensesReducer
      ),
      provideEffects(ExpensesEffects),
    ],
  },
];
