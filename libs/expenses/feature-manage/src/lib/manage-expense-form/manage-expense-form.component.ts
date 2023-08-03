import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpensePresenterService } from './expense-presenter.service';
import { ExpenseFormData } from './expense-form-data';

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
  providers: [ExpensePresenterService],
})
export class ManageExpenseFormComponent {
  expensePresenterService = inject(ExpensePresenterService);
  expenseFormData!: ExpenseFormData;
  #_expenseEntity!: ExpensesEntity;
  @Input() set expenseEntity(expenseEntity: ExpensesEntity) {
    this.#_expenseEntity = expenseEntity;
    this.expenseFormData = {
      description: expenseEntity.description,
      value: expenseEntity.amount.value,
      currency: expenseEntity.amount.currency,
      category: expenseEntity.category,
      store: expenseEntity.store,
    };
  }

  @Output() expenseSubmitted = new EventEmitter<ExpensesEntity>();

  submitExpenseForm(expenseForm: NgForm) {
    if (expenseForm.invalid) return;
    const expenseData = this.expensePresenterService.addExpense(
      expenseForm,
      this.#_expenseEntity
    );
    this.expenseSubmitted.emit(expenseData);
  }
}
