import { Injectable } from '@angular/core';
import { ExpenseFormData } from './expense-form-data';
import {
  ExpenseItemEntity,
  ExpensesEntity,
} from '@snarbanking-workspace/expenses/data-access';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'any',
})
export class ExpensePresenterService {
  #expensesEntity!: ExpensesEntity;
  initialize(expenseEntity?: ExpensesEntity): ExpenseFormData {
    this.#expensesEntity = expenseEntity ?? this.#createDefaultExpenseData();
    return this.#creeateExpenseFormData(this.#expensesEntity);
  }

  addExpense(expenseForm: NgForm): ExpensesEntity {
    const expenseData: ExpensesEntity = {
      ...this.#expensesEntity,
      description: expenseForm.value.description,
      amount: {
        ...this.#expensesEntity.amount,
        value: +expenseForm.value.amount,
      },
      category: expenseForm.value.category,
      store: expenseForm.value.store,
      purchaseDate: new Date(
        expenseForm.value.year,
        expenseForm.value.month,
        expenseForm.value.day
      ).toISOString(),
    };
    return expenseData;
  }

  readonly #createDefaultExpenseData: () => ExpensesEntity = () => {
    const today = new Date().toISOString().slice(0, 10);
    const defaultCurrency = 'GBP';
    const defaultStore = 'Lidl';
    return {
      id: Math.random().toString(36).substring(7),
      description: '',
      amount: {
        currency: defaultCurrency,
        value: 0,
      },
      category: 'Grocery',
      store: defaultStore,
      purchaseDate: today,
      items: [],
    };
  };

  readonly #creeateExpenseFormData = (
    expenseEntity: ExpensesEntity
  ): ExpenseFormData => {
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
    return expenseFormData;
  };
}
