import {
  ChangeDetectionStrategy,
  Component,
  Type,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { ExpensesUiExpenseFormComponent } from '@snarbanking-workspace/expenses/ui-expense-form';
import { UtilDialogService } from '@snarbanking-workspace/shared/util-dialog';
@Component({
  selector: 'snarbanking-workspace-expenses-feature-view',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule],
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
  utilDialogService = inject(UtilDialogService);
  constructor(public expensesStore: Store) {}
  createNewExpense(component: Type<unknown> = ExpensesUiExpenseFormComponent) {
    // this.expensesStore.dispatch(
    //   fromActions.createNewExpense({ component: this.testDialog })
    // );
    this.utilDialogService.open(component);
  }
}
