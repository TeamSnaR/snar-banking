import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalBudgetStore } from './personal-budget.store';

@Component({
  selector: 'snarbanking-workspace-expenses-feature-personal-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-feature-personal-budget.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PersonalBudgetStore],
})
export class ExpensesFeaturePersonalBudgetComponent {
  personalBudgetStore = inject(PersonalBudgetStore);
}
