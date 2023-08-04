import { Injectable, computed, signal } from '@angular/core';
import { ExpenseFormData } from './expense-form-data';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensePresenterService {
  daysSubject = new BehaviorSubject<number[]>([]);
  days$ = this.daysSubject.asObservable();

  initialize(expenseEntity: ExpensesEntity): ExpenseFormData {
    const purchaseDate = new Date(expenseEntity.purchaseDate);
    this.daysSubject.next(
      this.getDays(purchaseDate.getFullYear(), purchaseDate.getMonth() + 1)
    );
    return {
      description: expenseEntity.description,
      value: expenseEntity.amount.value,
      currency: expenseEntity.amount.currency,
      category: expenseEntity.category,
      store: expenseEntity.store,
      purchaseDate: expenseEntity.purchaseDate,
      year: purchaseDate.getFullYear(),
      month: purchaseDate.getMonth() + 1,
      day: purchaseDate.getDate(),
    };
  }
  addExpense(
    expenseForm: NgForm,
    expensesEntity: ExpensesEntity
  ): ExpensesEntity {
    // TODO: validate expense form data
    const expenseData: ExpensesEntity = {
      ...expensesEntity,
      description: expenseForm.value.description,
      amount: {
        ...expensesEntity.amount,
        value: +expenseForm.value.amount,
      },
      category: expenseForm.value.category,
      store: expenseForm.value.store,
    };
    return expenseData;
  }
  readonly years = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - i
  );
  readonly months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: new Date(0, i).toLocaleString('en', { month: 'long' }),
  }));

  getDays(year: number, month: number): number[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  readonly currencies = new Map([
    ['USD', '$'],
    ['EUR', '€'],
    ['GBP', '£'],
    ['PHP', '₱'],
    ['MYR', 'RM'],
  ]);
  readonly categories = ['Grocery', 'Travel', 'Accommodation', 'Other'];
  readonly groceryStores = [
    'Tesco',
    'Sainsbury',
    'Asda',
    'Morrisons',
    'Waitrose',
    'Lidl',
    'Aldi',
  ];
}
