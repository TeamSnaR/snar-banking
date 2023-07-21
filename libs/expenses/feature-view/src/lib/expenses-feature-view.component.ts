import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ExpensesState } from './+state/expenses.reducer';
import * as fromSelectors from './+state/expenses.selectors';
import * as fromActions from './+state/expenses.actions';
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

  // {
  //   expenses: this.expensesStore.select(fromSelectors.selectAllExpenses),
  //   loaded: this.expensesStore.select(fromSelectors.selectExpensesLoaded),
  //   error: this.expensesStore.select(fromSelectors.selectExpensesLoaded),
  // };
  constructor(public expensesStore: Store<ExpensesState>) {
    this.expensesStore.dispatch(fromActions.initExpenses());
  }
}
