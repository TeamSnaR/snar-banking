import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EXPENSES_FEATURE_KEY,
  ExpensesState,
  expensesAdapter,
} from './expenses.reducer';
import { selectRouteParam } from '@snarbanking-workspace/shared/data-access';

// Lookup the 'Expenses' feature state managed by NgRx
export const selectExpensesState =
  createFeatureSelector<ExpensesState>(EXPENSES_FEATURE_KEY);

const { selectAll, selectEntities } = expensesAdapter.getSelectors();

export const selectExpensesLoaded = createSelector(
  selectExpensesState,
  (state: ExpensesState) => state.loaded
);

export const selectExpensesError = createSelector(
  selectExpensesState,
  (state: ExpensesState) => state.error
);

export const selectAllExpenses = createSelector(
  selectExpensesState,
  (state: ExpensesState) => selectAll(state)
);

export const selectExpensesEntities = createSelector(
  selectExpensesState,
  (state: ExpensesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectExpensesState,
  (state: ExpensesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectExpensesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectEntityFromRoute = createSelector(
  selectExpensesEntities,
  selectRouteParam('id'),
  (entities, id) => (id ? entities[id] : undefined)
);

export const selectExpensesVm = createSelector(
  selectAllExpenses,
  selectExpensesLoaded,
  selectExpensesError,
  (expenses, loaded, error) => ({
    expenses: expenses
      .map((expense) => ({
        ...expense,
        purchaseDate: new Date(expense.purchaseDate),
      }))
      .sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime()),
    loaded,
    error,
  })
);

export const selectExpenseDetailsVm = createSelector(
  selectEntity,
  selectExpensesLoaded,
  selectExpensesError,
  (expenseDetails, loaded, error) => ({ expenseDetails, loaded, error })
);
