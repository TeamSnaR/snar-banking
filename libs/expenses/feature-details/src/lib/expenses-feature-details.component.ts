import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromActions from '@snarbanking-workspace/expenses/data-access';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';

@Component({
  selector: 'snarbanking-workspace-expenses-feature-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-feature-details.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ExpensesFeatureDetailsComponent {
  @Input()
  set id(expenseId: string) {
    this.store.dispatch(fromActions.setSelectedExpense({ id: expenseId }));
  }

  expenseDetails$ = this.store.select(fromSelectors.selectEntity);
  constructor(private store: Store) {}
}
