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
  expenseEntity = this.#createDefaultExpenseData();
  onExpenseFormSubmit(expenseEntity: ExpensesEntity) {
    this.store.dispatch(
      fromExpenseActions.addExpense({ expenseData: expenseEntity })
    );
  }
  onExpenseFormCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
