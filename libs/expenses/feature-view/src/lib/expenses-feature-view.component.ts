import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import * as fromActions from '@snarbanking-workspace/expenses/data-access';
import { RouterModule } from '@angular/router';
import { SlideOutService } from '@snarbanking-workspace/shared/ui';
import { ManageExpenseFormComponent } from '@snarbanking-workspace/expenses/ui-forms';
@Component({
  selector: 'snarbanking-workspace-expenses-feature-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  constructor(public expensesStore: Store, private slideOut: SlideOutService) {}

  public addExpense() {
    // this.expensesStore.dispatch(fromActions.addExpense());
    this.slideOut.open(ManageExpenseFormComponent);
  }
}
