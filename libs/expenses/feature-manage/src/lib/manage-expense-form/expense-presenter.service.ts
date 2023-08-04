import { Injectable } from '@angular/core';
import { ExpenseFormData } from './expense-form-data';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Subject, map, merge, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpensePresenterService {
  // TODO: add component store
  selectYear(year: number) {
    this.yearSubject.next(year);
  }
  selectMonth(month: number) {
    this.monthSubject.next(month);
  }
  daysSubject = new BehaviorSubject<number[]>([]);
  yearSubject = new BehaviorSubject<number>(new Date().getFullYear());
  monthSubject = new BehaviorSubject<number>(new Date().getMonth() + 1);

  // create a stream of days based on the year and month using rxjs
  days$ = merge(
    this.yearSubject.pipe(
      map((year) => ({ year, month: this.monthSubject.getValue() }))
    ),
    this.monthSubject.pipe(
      map((month) => ({ month, year: this.yearSubject.getValue() }))
    )
  ).pipe(map(({ year, month }) => this.getDays(year, month)));

  initialize(expenseEntity: ExpensesEntity): ExpenseFormData {
    const purchaseDate = new Date(expenseEntity.purchaseDate);
    const expenseFormData = {
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
    this.yearSubject.next(expenseFormData.year);
    this.monthSubject.next(expenseFormData.month);
    return expenseFormData;
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
