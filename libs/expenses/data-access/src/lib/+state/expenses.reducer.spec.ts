import { Action } from '@ngrx/store';

import * as ExpensesActions from './expenses.actions';
import { ExpensesEntity } from './expenses.models';
import {
  ExpensesState,
  initialExpensesState,
  expensesReducer,
} from './expenses.reducer';

describe('Expenses Reducer', () => {
  const createExpensesEntity = (
    id: string,
    description = ''
  ): ExpensesEntity => ({
    id,
    description: description || `name-${id}`,
    amount: {
      currency: 'GBP',
      value: 1.0,
    },
    category: 'Grocery',
    store: 'Lidl',
    items: [],
  });

  describe('valid Expenses actions', () => {
    it('loadExpensesSuccess should return the list of known Expenses', () => {
      const expenses = [
        createExpensesEntity('PRODUCT-AAA'),
        createExpensesEntity('PRODUCT-zzz'),
      ];
      const action = ExpensesActions.loadExpensesSuccess({ expenses });

      const result: ExpensesState = expensesReducer(
        initialExpensesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = expensesReducer(initialExpensesState, action);

      expect(result).toBe(initialExpensesState);
    });
  });
});
