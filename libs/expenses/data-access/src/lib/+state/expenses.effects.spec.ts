import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as ExpensesActions from './expenses.actions';
import { ExpensesEffects } from './expenses.effects';
import { provideHttpClient } from '@angular/common/http';
import { ExpensesService } from '../expenses.service';

describe('ExpensesEffects', () => {
  let actions: Observable<Action>;
  let effects: ExpensesEffects;
  let expenseService: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExpensesEffects,
        ExpensesService,
        provideMockActions(() => actions),
        provideMockStore(),
        provideHttpClient(),
      ],
    });

    effects = TestBed.inject(ExpensesEffects);
    actions = of(ExpensesActions.initExpenses());
    expenseService = TestBed.inject(ExpensesService);
    expenseService.getExpenses = () => of([]);
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
