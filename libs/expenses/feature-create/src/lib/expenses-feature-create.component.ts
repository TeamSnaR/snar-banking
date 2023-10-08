import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import {
  ExpenseFormData,
  ManageExpenseFormComponent,
} from '@snarbanking-workspace/expenses/ui-forms';
import { Store } from '@ngrx/store';
import * as fromExpenseActions from '@snarbanking-workspace/expenses/data-access';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'snarbanking-workspace-expenses-feature-create',
  standalone: true,
  imports: [CommonModule, ManageExpenseFormComponent],
  templateUrl: './expenses-feature-create.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesFeatureCreateComponent {
  store = inject(Store);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  #createDefaultExpenseData: () => ExpensesEntity = () => {
    const today = new Date().toISOString().slice(0, 10);
    const defaultCurrency = 'GBP';
    const defaultStore = 'Lidl';
    const defaultCategory = 'Grocery';
    return {
      id: Math.random().toString(36).substring(7),
      description: `${defaultStore} ${defaultCategory} ${today}`,
      amount: {
        currency: defaultCurrency,
        value: 0.0,
      },
      store: defaultStore,
      category: defaultCategory,
      purchaseDate: today,
      items: [],
    };
  };
  #createExpenseFormData = (expenseEntity: ExpensesEntity): ExpenseFormData => {
    const purchaseDate = new Date(expenseEntity.purchaseDate);
    const expenseFormData = {
      description: expenseEntity.description,
      amount: expenseEntity.amount.value,
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
  expenseFormData = this.#createExpenseFormData(
    this.#createDefaultExpenseData()
  );
  currencies = new Map([
    ['USD', '$'],
    ['EUR', '€'],
    ['GBP', '£'],
    ['PHP', '₱'],
    ['MYR', 'RM'],
  ]);
  categories = ['Grocery', 'Travel', 'Accommodation', 'Other'];
  groceryStores = [
    'Tesco',
    'Sainsbury',
    'Asda',
    'Morrisons',
    'Waitrose',
    'Lidl',
    'Aldi',
  ];
  onExpenseFormSubmit(expenseData: ExpenseFormData) {
    const expenseEntity = {
      ...this.#createDefaultExpenseData(),
      description: expenseData.description,
      amount: {
        value: expenseData.amount,
        currency: expenseData.currency,
      },
      category: expenseData.category,
      store: expenseData.store,
      purchaseDate: expenseData.purchaseDate,
    };

    this.store.dispatch(
      fromExpenseActions.addExpense({ expenseData: expenseEntity })
    );
  }
  onExpenseFormCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
