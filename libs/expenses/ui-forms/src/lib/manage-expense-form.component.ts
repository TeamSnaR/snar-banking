import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpenseFormData } from './expense-form-data';
import { ExpenseFormStore } from './expense-form.store';
import { CurrencySymbolPipe } from '@snarbanking-workspace/shared/util-pipes';

@Component({
  selector: 'snarbanking-workspace-manage-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencySymbolPipe],
  templateUrl: './manage-expense-form.component.html',
  providers: [ExpenseFormStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageExpenseFormComponent implements OnInit {
  // expenseFormStore = inject(ExpenseFormStore);
  // @Input({ required: true }) expenseFormData!: ExpenseFormData;
  // @Input({ required: true }) categories!: string[];
  // @Input({ required: true }) stores!: string[];

  // @Output() expenseFormSubmit = new EventEmitter<ExpenseFormData>();
  // @Output() expenseFormCancel = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('init');
    // this.expenseFormStore.initialize(this.expenseFormData);
  }

  // submitExpenseForm(expenseForm: NgForm) {
  //   if (!this.expenseFormStore.validate(expenseForm)) return;
  //   const expenseData = this.expenseFormStore.addExpense(expenseForm);
  //   this.expenseFormStore.resetExpenseForm(expenseForm);
  //   this.expenseFormSubmit.emit(expenseData);
  // }

  // cancelExpenseForm() {
  //   this.expenseFormCancel.emit();
  // }

  // monthSelected($event: Event) {
  //   const month = ($event.target as HTMLInputElement).value;
  //   this.expenseFormStore.selectMonth(+month);
  // }
  // yearSelected($event: Event) {
  //   const year = ($event.target as HTMLInputElement).value;
  //   this.expenseFormStore.selectYear(+year);
  // }
}
