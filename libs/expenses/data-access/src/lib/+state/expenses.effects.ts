import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import {
  catchError,
  of,
  concatMap,
  map,
  combineLatest,
  switchMap,
  tap,
} from 'rxjs';
import * as ExpensesActions from './expenses.actions';
import { ExpensesEntity } from './expenses.models';
import { ExpensesService } from '../expenses.service';
import { Action, Store } from '@ngrx/store';
import { selectExpensesEntities } from './expenses.selectors';
import { selectRouteParam } from '@snarbanking-workspace/shared/data-access';
import { Router } from '@angular/router';

@Injectable()
export class ExpensesEffects {
  ngrxOnInitEffects(): Action {
    return ExpensesActions.initExpenses();
  }
  private actions$ = inject(Actions);
  private expensesService = inject(ExpensesService);
  private router = inject(Router);
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

  expenseDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.getExpenseDetails),
      concatLatestFrom(() => [
        this.store.select(selectRouteParam('id')),
        this.store.select(selectExpensesEntities),
      ]),
      switchMap(([, id, entities]) =>
        id && entities[id] != null
          ? of(id).pipe(map((id) => ExpensesActions.setSelectedExpense({ id })))
          : this.expensesService.getExpenseDetails(id!).pipe(
              map((expenseDetails) =>
                ExpensesActions.loadExpenseDetailsSuccess({
                  expenseDetails,
                })
              )
            )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ExpensesActions.loadExpenseDetailsFailure({ error }));
      })
    )
  );

  addExpense = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.addExpense),
      concatMap(({ expenseData }) =>
        this.expensesService.addExpense(expenseData).pipe(
          switchMap((id) =>
            this.expensesService.getExpenseDetails(id).pipe(
              map((newExpense) =>
                ExpensesActions.addExpenseSuccess({ expense: newExpense })
              ),
              catchError((error) =>
                of(ExpensesActions.addExpenseFailure({ error }))
              )
            )
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
