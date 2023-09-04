import { TestBed } from '@angular/core/testing';

import { ExpenseFormStore } from './expense-form.store';

describe('ExpenseFormStore', () => {
  let service: ExpenseFormStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseFormStore],
    });
    service = TestBed.inject(ExpenseFormStore);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
