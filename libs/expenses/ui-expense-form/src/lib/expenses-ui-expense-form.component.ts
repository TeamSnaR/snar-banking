import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'snarbanking-workspace-expenses-ui-expense-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-ui-expense-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesUiExpenseFormComponent {
  @Input() contentData: { text: string } | undefined;
  dialogData = inject(DIALOG_DATA);
}
