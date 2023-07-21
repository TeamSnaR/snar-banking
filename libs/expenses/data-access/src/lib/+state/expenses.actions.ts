import { createAction, props } from '@ngrx/store';
import { ExpensesEntity } from './expenses.models';

export const initExpenses = createAction('[Expenses Page] Init');

export const loadExpensesSuccess = createAction(
  '[Expenses/API] Load Expenses Success',
  props<{ expenses: ExpensesEntity[] }>()
);

export const loadExpensesFailure = createAction(
  '[Expenses/API] Load Expenses Failure',
  props<{ error: string }>()
);
