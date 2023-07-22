import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map, withLatestFrom } from 'rxjs';
import * as ExpensesActions from './expenses.actions';
import { ExpensesEntity } from './expenses.models';
import { ExpensesService } from '../expenses.service';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class ExpensesEffects {
  ngrxOnInitEffects(): Action {
    return ExpensesActions.initExpenses();
  }
  private actions$ = inject(Actions);
  private expensesService = inject(ExpensesService);
  private store = inject(Store);
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
