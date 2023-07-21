import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map } from 'rxjs';
import * as ExpensesActions from './expenses.actions';
import { ExpensesEntity } from './expenses.models';
import { ExpensesService } from '../expenses.service';

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
