import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ExpensesActions from './expenses.actions';
import { ExpensesEffects } from './expenses.effects';

describe('ExpensesEffects', () => {
  let actions: Observable<Action>;
  let effects: ExpensesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ExpensesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ExpensesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ExpensesActions.initExpenses() });

      const expected = hot('-a-|', {
        a: ExpensesActions.loadExpensesSuccess({ expenses: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
