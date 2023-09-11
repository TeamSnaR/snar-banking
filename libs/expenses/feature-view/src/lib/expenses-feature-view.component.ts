import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  StaticProvider,
  Type,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import { RouterModule } from '@angular/router';
import {
  Dialog,
  DialogConfig,
  DialogModule,
  DialogRef,
} from '@angular/cdk/dialog';
import {
  ExpenseFormContainerComponent,
  ExpensesUiExpenseFormComponent,
} from '@snarbanking-workspace/expenses/ui-expense-form';
import { UtilDialogService } from '@snarbanking-workspace/shared/util-dialog';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { BasePortalOutlet } from '@angular/cdk/portal';
@Component({
  selector: 'snarbanking-workspace-expenses-feature-view',
  standalone: true,
  imports: [CommonModule, RouterModule, DialogModule, OverlayModule],
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
  #dialog = inject(Dialog);
  #overlay = inject(Overlay);
  constructor(public expensesStore: Store) {}
  createNewExpense(component: Type<unknown> = ExpensesUiExpenseFormComponent) {
    // this.expensesStore.dispatch(
    //   fromActions.createNewExpense({ component: this.testDialog })
    // );
    // this.utilDialogService.open(component);
    this.#dialog.open(component, {
      positionStrategy: this.#overlay
        .position()
        .global()
        .centerHorizontally()
        .right('0'),
      container: {
        type: ExpenseFormContainerComponent,
        providers: (config) => {
          return [];
        },
      },
    });
  }
}
