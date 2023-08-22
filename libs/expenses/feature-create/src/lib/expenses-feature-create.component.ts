import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { ManageExpenseFormComponent } from '@snarbanking-workspace/expenses/ui-forms';
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
  expenseEntity = this.#createDefaultExpenseData();
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
  onExpenseFormSubmit(expenseData: ExpensesEntity) {
    this.store.dispatch(fromExpenseActions.addExpense({ expenseData }));
  }
  onExpenseFormCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
