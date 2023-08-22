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

  onExpenseFormSubmit(expenseEntity: ExpensesEntity) {
    this.store.dispatch(
      fromExpenseActions.addExpense({ expenseData: expenseEntity })
    );
  }
  onExpenseFormCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
