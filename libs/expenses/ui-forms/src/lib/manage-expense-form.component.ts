import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpensePresenterService } from './expense-presenter.service';
import { ExpenseFormData } from './expense-form-data';
import { ExpenseFormStore } from './expense-form.store';

@Component({
  selector: 'snarbanking-workspace-manage-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-expense-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  providers: [ExpensePresenterService, ExpenseFormStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageExpenseFormComponent {
  expensePresenterService = inject(ExpensePresenterService);
  expenseFormStore = inject(ExpenseFormStore);
  expenseFormData!: ExpenseFormData;
  @Input() set expenseEntity(expenseEntity: ExpensesEntity | undefined) {
    this.expenseFormData =
      this.expensePresenterService.initialize(expenseEntity);
    this.expenseFormStore.initialize(this.expenseFormData);
  }

  @Output() expenseFormSubmit = new EventEmitter<ExpensesEntity>();
  @Output() expenseFormCancel = new EventEmitter<void>();

  submitExpenseForm(expenseForm: NgForm) {
    if (!this.expensePresenterService.validate(expenseForm)) return;
    const expenseData = this.expensePresenterService.addExpense(expenseForm);
    this.expensePresenterService.resetExpenseForm(expenseForm);
    this.expenseFormSubmit.emit(expenseData);
  }

  cancelExpenseForm() {
    this.expenseFormCancel.emit();
  }

  monthSelected($event: Event) {
    const month = ($event.target as HTMLInputElement).value;
    this.expenseFormStore.selectMonth(+month);
  }
  yearSelected($event: Event) {
    const year = ($event.target as HTMLInputElement).value;
    this.expenseFormStore.selectYear(+year);
  }
}
