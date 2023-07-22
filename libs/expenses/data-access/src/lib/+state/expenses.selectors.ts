import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EXPENSES_FEATURE_KEY,
  ExpensesState,
  expensesAdapter,
} from './expenses.reducer';

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

export const selectExpensesVm = createSelector(
  selectAllExpenses,
  selectExpensesLoaded,
  selectExpensesError,
  (expenses, loaded, error) => ({ expenses, loaded, error })
);
