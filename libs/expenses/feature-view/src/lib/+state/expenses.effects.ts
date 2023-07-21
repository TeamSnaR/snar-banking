import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ExpensesActions from './expenses.actions';
import * as ExpensesFeature from './expenses.reducer';

@Injectable()
export class ExpensesEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.initExpenses),
      switchMap(() =>
        of(
          ExpensesActions.loadExpensesSuccess({
            expenses: [
              {
                id: 'abc123',
                description: 'Aptamil',
                amount: {
                  currency: 'GBP',
                  value: 11.65,
                },
                category: 'Grocery',
                store: "Saver's",
                items: [],
              },
            ],
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ExpensesActions.loadExpensesFailure({ error }));
      })
    )
  );
}
