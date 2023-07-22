import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expenses.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
