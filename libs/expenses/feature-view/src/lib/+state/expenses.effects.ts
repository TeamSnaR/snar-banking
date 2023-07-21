import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, concatMap, map } from 'rxjs';
import * as ExpensesActions from './expenses.actions';
import * as ExpensesFeature from './expenses.reducer';
import { ExpensesService } from '@snarbanking-workspace/expenses/data-access';
import { ExpensesEntity } from './expenses.models';

@Injectable()
export class ExpensesEffects {
  private actions$ = inject(Actions);
  private expensesService = inject(ExpensesService);
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.initExpenses),
      concatMap(() =>
        this.expensesService
          .getExpenses()
          .pipe(
            map((expenses: ExpensesEntity[]) =>
              ExpensesActions.loadExpensesSuccess({ expenses })
            )
          )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ExpensesActions.loadExpensesFailure({ error }));
      })
    )
  );
}
