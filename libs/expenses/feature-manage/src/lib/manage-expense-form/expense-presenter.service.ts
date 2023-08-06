import { Injectable } from '@angular/core';
import { ExpenseFormData } from './expense-form-data';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ExpensePresenterService {
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
    return expenseFormData;
  }
  addExpense(
    expenseForm: NgForm,
    expensesEntity: ExpensesEntity
  ): ExpensesEntity {
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
}
