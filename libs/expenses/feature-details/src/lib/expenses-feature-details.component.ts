import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import * as fromActions from '@snarbanking-workspace/expenses/data-access';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'snarbanking-workspace-expenses-feature-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  expenseDetailsVm$ = this.store.select(fromSelectors.selectExpenseDetailsVm);
  constructor(private store: Store) {
    this.store.dispatch(fromActions.getExpenseDetails({}));
  }
}
