import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { ManageExpenseFormComponent } from '@snarbanking-workspace/expenses/ui-forms';

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
  // create and initialize a new object of type ExpensesEntity here
  expenseEntity: ExpensesEntity = {
    id: 0,
    amount: { value: 0, currency: 'GBP' },
    purchaseDate: new Date().toUTCString(),
    store: '',
    category: '',
    description: '',
    items: [],
  };
}
