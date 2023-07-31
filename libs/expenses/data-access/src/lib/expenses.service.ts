import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpensesEntity } from './+state/expenses.models';
@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private httpClient: HttpClient) {}

  getExpenses(): Observable<ExpensesEntity[]> {
    return this.httpClient.get<ExpensesEntity[]>('/api/expenses');
  }

  getExpenseDetails(expenseId: string): Observable<ExpensesEntity> {
    return this.httpClient.get<ExpensesEntity>(`/api/expenses/${expenseId}`);
  }
}
