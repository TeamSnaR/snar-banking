import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import * as fromActions from '@snarbanking-workspace/expenses/data-access';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
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
  #dialog = inject(Dialog);
  public vm$ = this.expensesStore.select(fromSelectors.selectExpensesVm);
  constructor(public expensesStore: Store) {}

  createNewExpense() {
    this.#dialog.open(this.testDialog);
    // this.expensesStore.dispatch(
    //   fromActions.createNewExpense({ component: this.testDialog })
    // );
  }
}
