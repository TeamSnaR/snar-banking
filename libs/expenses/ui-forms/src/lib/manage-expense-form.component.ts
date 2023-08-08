import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpensePresenterService } from './expense-presenter.service';
import { ExpenseFormData } from './expense-form-data';
import { ExpenseFormStore } from './expense-form.store';
import { Store } from '@ngrx/store';
import * as fromExpenseActions from '@snarbanking-workspace/expenses/data-access';

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
})
export class ManageExpenseFormComponent {
  expensePresenterService = inject(ExpensePresenterService);
  expenseFormStore = inject(ExpenseFormStore);
  expenseFormData!: ExpenseFormData;
  @Input() set expenseEntity(expenseEntity: ExpensesEntity) {
    this.expenseFormData =
      this.expensePresenterService.initialize(expenseEntity);
    this.expenseFormStore.initialize(this.expenseFormData);
  }

  @Output() expenseFormSubmit = new EventEmitter<ExpensesEntity>();

  submitExpenseForm(expenseForm: NgForm) {
    if (expenseForm.invalid) return;
    const expenseData = this.expensePresenterService.addExpense(expenseForm);
    this.expenseFormSubmit.emit(expenseData);
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
