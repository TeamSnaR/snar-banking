import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snarbanking-workspace-expenses-feature-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-feature-details.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ExpensesFeatureDetailsComponent {}
