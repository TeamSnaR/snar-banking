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
  props<{ id?: string | number }>()
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

export const addExpenseSuccess = createAction(
  '[Expenses/API] Add Expense Success',
  props<{ expense: ExpensesEntity }>()
);

export const addExpenseFailure = createAction(
  '[Expenses/API] Add Expense Failure',
  props<{ error: string }>()
);

export const updateExpense = createAction(
  '[Manage Expense Form] Update Expense',
  props<{ expenseData: ExpensesEntity }>()
);

export const updateExpenseSuccess = createAction(
  '[Expenses/API] Update Expense Success',
  props<{ expense: ExpensesEntity }>()
);

export const updateExpenseFailure = createAction(
  '[Expenses/API] Update Expense Failure',
  props<{ error: string }>()
);
