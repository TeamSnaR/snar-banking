import { createAction, emptyProps, props } from '@ngrx/store';
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

export const setSelectedExpense = createAction(
  '[Expense Details Page] Set',
  props<{ id: string }>()
);
export const getExpenseDetails = createAction(
  '[Expense Details Page] Get',
  emptyProps
);
export const loadExpenseDetailsSuccess = createAction(
  '[Expenses/API] Load Expense Details Success',
  props<{ expenseDetails: ExpensesEntity }>()
);
export const loadExpenseDetailsFailure = createAction(
  '[Expenses/API] Load Expense Details Failure',
  props<{ error: string }>()
);
export const addExpense = createAction(
  '[Manage Expense Form] Add Expense',
  props<{ expenseData: ExpensesEntity }>()
);
