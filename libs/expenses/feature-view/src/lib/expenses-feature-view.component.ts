import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ExpensesUiExpenseFormComponent } from '@snarbanking-workspace/expenses/ui-expense-form';
import { ComponentType, GlobalPositionStrategy } from '@angular/cdk/overlay';
import {
  IAnimatedDialogConfig,
  UtilDialogRef,
} from '@snarbanking-workspace/shared/util-dialog';
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
  @ViewChild('testDialog', { static: true }) testDialog!: TemplateRef<unknown>;
  public vm$ = this.expensesStore.select(fromSelectors.selectExpensesVm);
  constructor(public expensesStore: Store, private dialog: Dialog) {}
  createNewExpense(component: Type<unknown> = ExpensesUiExpenseFormComponent) {
    // this.expensesStore.dispatch(
    //   fromActions.createNewExpense({ component: this.testDialog })
    // );
    const utilDialogRef = new UtilDialogRef();
    const ref = this.dialog.open(component, {
      // positionStrategy: new GlobalPositionStrategy()
      //   .centerHorizontally()
      //   .right('0'),
      hasBackdrop: true,
      backdropClass: ['bg-black', 'bg-opacity-50'],
      data: {
        title: 'Create new expense',
      },
      disableClose: true,
      // closeOnDestroy: false,
      // closeOnOverlayDetachments: false,
      injector: Injector.create({
        providers: [
          {
            provide: UtilDialogRef,
            useValue: utilDialogRef,
          },
        ],
      }),
    });
    utilDialogRef.setDialogRef(ref);
  }
}
