import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private httpClient: HttpClient) {}

  getExpenses(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/expenses');
  }
}
