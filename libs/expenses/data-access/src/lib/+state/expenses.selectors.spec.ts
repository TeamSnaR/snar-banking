import { ExpensesEntity } from './expenses.models';
import {
  expensesAdapter,
  ExpensesPartialState,
  initialExpensesState,
} from './expenses.reducer';
import * as ExpensesSelectors from './expenses.selectors';

describe('Expenses Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getExpensesId = (it: ExpensesEntity) => it.id;
  const createExpensesEntity = (id: string, description = '') =>
    ({
      id,
      description: description || `name-${id}`,
      amount: {
        currency: 'GBP',
        value: 1.0,
      },
      category: 'Grocery',
      store: 'Lidl',
      items: [],
    } as ExpensesEntity);

  let state: ExpensesPartialState;

  beforeEach(() => {
    state = {
      expenses: expensesAdapter.setAll(
        [
          createExpensesEntity('PRODUCT-AAA'),
          createExpensesEntity('PRODUCT-BBB'),
          createExpensesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialExpensesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Expenses Selectors', () => {
    it('selectAllExpenses() should return the list of Expenses', () => {
      const results = ExpensesSelectors.selectAllExpenses(state);
      const selId = getExpensesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ExpensesSelectors.selectEntity(state) as ExpensesEntity;
      const selId = getExpensesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectExpensesLoaded() should return the current "loaded" status', () => {
      const result = ExpensesSelectors.selectExpensesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectExpensesError() should return the current "error" state', () => {
      const result = ExpensesSelectors.selectExpensesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
