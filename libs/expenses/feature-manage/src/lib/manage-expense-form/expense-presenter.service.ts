import { Injectable } from '@angular/core';
import { ExpenseFormData } from './expense-form-data';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ExpensePresenterService {
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
