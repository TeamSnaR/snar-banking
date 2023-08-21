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
import {
  TOASTR_CONFIG,
  ToastrConfig,
} from '@snarbanking-workspace/shared/toastr/util';
import { Type } from '@angular/core';

describe('ExpensesEffects', () => {
  let actions: Observable<Action>;
  let effects: ExpensesEffects;
  let expenseService: ExpensesService;
  const mockToastrConfig: ToastrConfig = {
    template: null as unknown as Type<unknown>,
    position: 'top',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExpensesEffects,
        ExpensesService,
        provideMockActions(() => actions),
        provideMockStore(),
        provideHttpClient(),
        {
          provide: TOASTR_CONFIG,
          useValue: mockToastrConfig,
        },
      ],
    });

    effects = TestBed.inject(ExpensesEffects);
    actions = of(ExpensesActions.initExpenses());
    expenseService = TestBed.inject(ExpensesService);
    expenseService.getExpenses = () => of([]);
    TestBed.inject(TOASTR_CONFIG);
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
