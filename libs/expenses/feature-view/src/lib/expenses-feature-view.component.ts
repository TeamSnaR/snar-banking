import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import { RouterModule } from '@angular/router';
import { ManageExpenseFormComponent } from '@snarbanking-workspace/expenses/ui-forms';
import { FeatureViewPresenter } from './feature-view.presenter';
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
  viewProviders: [FeatureViewPresenter],
})
export class ExpensesFeatureViewComponent {
  public vm$ = this.expensesStore.select(fromSelectors.selectExpensesVm);
  #featureViewPresenter = inject(FeatureViewPresenter);
  constructor(public expensesStore: Store) {}

  public addExpense() {
    this.#featureViewPresenter.addExpense({
      component: ManageExpenseFormComponent,
      id: null,
    });
  }
}
