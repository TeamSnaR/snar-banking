import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import * as fromActions from '@snarbanking-workspace/expenses/data-access';
@Component({
  selector: 'snarbanking-workspace-expenses-feature-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-feature-view.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesFeatureViewComponent {
  public vm$ = this.expensesStore.select(fromSelectors.selectExpensesVm);
  constructor(public expensesStore: Store) {
    this.expensesStore.dispatch(fromActions.initExpenses());
  }
}
