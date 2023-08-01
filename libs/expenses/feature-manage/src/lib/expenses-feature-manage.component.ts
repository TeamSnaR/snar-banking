import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snarbanking-workspace-expenses-feature-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-feature-manage.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesFeatureManageComponent {}
