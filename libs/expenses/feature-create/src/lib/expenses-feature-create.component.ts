import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snarbanking-workspace-expenses-feature-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-feature-create.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesFeatureCreateComponent {}
