import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { FormsModule } from '@angular/forms';

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
  expenseFormData!: ExpensesEntity;
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
  @Input() set expenseEntity(value: ExpensesEntity) {
    this.expenseFormData = { ...value };
  }
}
