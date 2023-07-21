import { Route } from '@angular/router';
import { ExpensesFeatureViewComponent } from './expenses-feature-view.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromExpenses from './+state/expenses.reducer';
import { ExpensesEffects } from './+state/expenses.effects';

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
