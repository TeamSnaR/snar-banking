import { Component, Input, inject } from '@angular/core';
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
})
export class ManageExpenseFormComponent {
  expensePresenterService = inject(ExpensePresenterService);
  expenseFormStore = inject(ExpenseFormStore);
  expenseFormData!: ExpenseFormData;
  #_expenseEntity!: ExpensesEntity;
  @Input() set expenseEntity(expenseEntity: ExpensesEntity) {
    this.#_expenseEntity = expenseEntity;
    this.expenseFormData =
      this.expensePresenterService.initialize(expenseEntity);
    this.expenseFormStore.initialize(this.expenseFormData);
  }

  submitExpenseForm(expenseForm: NgForm) {
    if (expenseForm.invalid) return;
    const expenseData = this.expensePresenterService.addExpense(
      expenseForm,
      this.#_expenseEntity
    );

    console.log(expenseData);
    // TODO: submit expenseData
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
