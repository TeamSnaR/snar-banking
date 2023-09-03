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
import { ExpensePresenterService } from './expense-presenter.service';
import { ExpenseFormData } from './expense-form-data';
import { ExpenseFormStore } from './expense-form.store';
import { CurrencySymbolPipe } from '@snarbanking-workspace/shared/util-pipes';

@Component({
  selector: 'snarbanking-workspace-manage-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencySymbolPipe],
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
export class ManageExpenseFormComponent implements OnInit {
  expensePresenterService = inject(ExpensePresenterService);
  expenseFormStore = inject(ExpenseFormStore);
  expenseFormData!: ExpenseFormData;
  @Input({ required: true }) set expenseEntity(expenseEntity: ExpensesEntity) {
    this.expenseFormData =
      this.expensePresenterService.initialize(expenseEntity);
  }
  @Input({ required: true }) categories!: string[];
  @Input({ required: true }) stores!: string[];

  @Output() expenseFormSubmit = new EventEmitter<ExpensesEntity>();
  @Output() expenseFormCancel = new EventEmitter<void>();
  ngOnInit(): void {
    this.expenseFormStore.initialize(this.expenseFormData);
  }

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
