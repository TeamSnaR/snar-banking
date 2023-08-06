import { TestBed } from '@angular/core/testing';

import { ExpensePresenterService } from './expense-presenter.service';

describe('ExpensePresenterService', () => {
  let service: ExpensePresenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensePresenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
