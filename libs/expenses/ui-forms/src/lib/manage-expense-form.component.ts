import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpenseFormStore } from './expense-form.store';
import { CurrencySymbolPipe } from '@snarbanking-workspace/shared/util-pipes';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { SlideOutRef } from '@snarbanking-workspace/shared/ui';

@Component({
  selector: 'snarbanking-workspace-manage-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencySymbolPipe],
  templateUrl: './manage-expense-form.component.html',
  providers: [ExpenseFormStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageExpenseFormComponent implements OnInit {
  #dialogData = inject(DIALOG_DATA);
  #expenseFormStore = inject(ExpenseFormStore);
  #slideOutRef = inject(SlideOutRef);
  vm$ = this.#expenseFormStore.vm$;
  ngOnInit(): void {
    this.#expenseFormStore.initialize(this.#dialogData);
  }

  cancel() {
    this.close();
  }

  close() {
    this.#slideOutRef.close();
  }

  save(expenseForm: NgForm) {
    this.submitExpenseForm(expenseForm);
  }

  delete() {
    const expenseData = this.#expenseFormStore.deleteExpense();
    this.#slideOutRef.close({ data: expenseData, delete: true });
  }

  submitExpenseForm(expenseForm: NgForm) {
    if (!this.#expenseFormStore.validate(expenseForm)) return;
    const expenseData = this.#expenseFormStore.saveExpense(expenseForm);
    this.#slideOutRef.close(expenseData);
  }

  monthSelected($event: Event) {
    const month = ($event.target as HTMLInputElement).value;
    this.#expenseFormStore.selectMonth(+month);
  }
  yearSelected($event: Event) {
    const year = ($event.target as HTMLInputElement).value;
    this.#expenseFormStore.selectYear(+year);
  }
}
