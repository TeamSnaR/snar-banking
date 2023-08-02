import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { FormsModule, NgForm } from '@angular/forms';

export type ExpenseFormData = Omit<
  ExpensesEntity,
  'id' | 'amount' | 'items'
> & {
  currency: string;
  value: number;
};
@Component({
  selector: 'snarbanking-workspace-manage-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-expense-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ManageExpenseFormComponent {
  expenseFormData!: ExpenseFormData;
  // create a javascript map of currencies and their symbols to use in the template
  currencies = new Map([
    ['USD', '$'],
    ['EUR', '€'],
    ['GBP', '£'],
    ['PHP', '₱'],
    ['MYR', 'RM'],
  ]);
  // create a javascript array of categories to use in the template
  categories = ['Grocery', 'Travel', 'Accommodation', 'Other'];
  // create a javascript array of grocery stores in the uk to use in the template
  groceryStores = [
    'Tesco',
    'Sainsbury',
    'Asda',
    'Morrisons',
    'Waitrose',
    'Lidl',
    'Aldi',
  ];
  #_expenseEntity!: ExpensesEntity;
  @Input() set expenseEntity(expenseEntity: ExpensesEntity) {
    this.#_expenseEntity = expenseEntity;
    this.expenseFormData = {
      description: expenseEntity.description,
      value: expenseEntity.amount.value,
      currency: expenseEntity.amount.currency,
      category: expenseEntity.category,
      store: expenseEntity.store,
    };
  }

  @Output() expenseSubmitted = new EventEmitter<ExpensesEntity>();

  submitExpenseForm(expenseForm: NgForm) {
    if (expenseForm.valid) {
      const expenseData: ExpensesEntity = {
        ...this.#_expenseEntity,
        description: expenseForm.value.description,
        amount: {
          ...this.#_expenseEntity.amount,
          value: +expenseForm.value.amount,
        },
        category: expenseForm.value.category,
        store: expenseForm.value.store,
      };

      // validate and cleanse the data
      this.expenseSubmitted.emit(expenseData);
    }
  }
}
