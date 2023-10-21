import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ExpenseFormData } from './expense-form-data';
import { NgForm } from '@angular/forms';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';

export type ExpenseFormState = {
  years: number[];
  months: { value: number; name: string }[];
  purchaseDate: {
    year: number;
    month: number;
    day: number;
  };
  currency: string;
  categories: string[];
  locations: string[];
  expenseFormData?: ExpenseFormData;
  expenseEntityData?: ExpensesEntity;
};
const INITIAL_STATE: ExpenseFormState = {
  years: Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i),
  months: Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: new Date(0, i).toLocaleString('en', { month: 'long' }),
  })),
  purchaseDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },
  currency: 'GBP',
  categories: ['Grocery', 'Travel', 'Accommodation', 'Other'],
  locations: [
    'Tesco',
    'Sainsbury',
    'Asda',
    'Morrisons',
    'Waitrose',
    'Lidl',
    'Aldi',
  ],
};

@Injectable()
export class ExpenseFormStore extends ComponentStore<ExpenseFormState> {
  readonly years$ = this.select((state) => state.years);
  readonly months$ = this.select((state) => state.months);
  readonly days$ = this.select(
    this.select((state) => state.purchaseDate),
    ({ year, month }) => {
      const daysInMonth = new Date(year, month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }
  );
  readonly dateValues$ = this.select(
    this.days$,
    this.months$,
    this.years$,
    (days, months, years) => ({ days, months, years })
  );
  readonly vm$ = this.select(
    this.dateValues$,
    this.state$,
    ({ days, months, years }, state) => ({
      days,
      months,
      years,
      currency: state.currency,
      categories: state.categories,
      locations: state.locations,
      expenseFormData: state.expenseFormData,
      mode: String(state.expenseEntityData?.id).length > 7 ? 'edit' : 'create',
    })
  );

  constructor() {
    super(INITIAL_STATE);
  }

  readonly initialize = this.updater(
    (state, expenseEntityData: ExpensesEntity) => {
      const purchaseDate = new Date(expenseEntityData.purchaseDate);
      const expenseFormData = {
        description: expenseEntityData.description,
        amount: expenseEntityData.amount.value,
        currency: expenseEntityData.amount.currency,
        category: expenseEntityData.category,
        store: expenseEntityData.store,
        purchaseDate: expenseEntityData.purchaseDate,
        year: purchaseDate.getFullYear(),
        month: purchaseDate.getMonth() + 1,
        day: purchaseDate.getDate(),
      };
      return {
        ...state,
        purchaseDate: {
          year: purchaseDate.getFullYear(),
          month: purchaseDate.getMonth(),
          day: purchaseDate.getDate(),
        },
        expenseEntityData,
        expenseFormData,
      };
    }
  );

  selectMonth(month: number) {
    this.patchState((state) => {
      const purchaseDate = { ...state.purchaseDate, month };
      return { ...state, purchaseDate };
    });
  }

  selectYear(year: number) {
    this.patchState((state) => {
      const purchaseDate = { ...state.purchaseDate, year };
      return { ...state, purchaseDate };
    });
  }

  readonly validate = (expenseForm: NgForm): boolean => {
    expenseForm.form.markAllAsTouched();
    return !!expenseForm.valid;
  };

  readonly saveExpense = (expenseForm: NgForm): ExpensesEntity => {
    const expenseFromForm = expenseForm.value as ExpenseFormData;
    const expenseEntityData = this.get().expenseEntityData!;
    const expenseToSave = {
      ...expenseEntityData,
      description: expenseFromForm.description,
      amount: {
        ...expenseEntityData.amount,
        value: expenseFromForm.amount,
      },
      category: expenseFromForm.category,
      store: expenseFromForm.store,
      purchaseDate: new Date(
        expenseFromForm.year,
        expenseFromForm.month - 1,
        expenseFromForm.day
      ).toISOString(),
    };
    return expenseToSave;
  };

  readonly deleteExpense = () => {
    const expenseEntityData = this.get().expenseEntityData!;
    return expenseEntityData;
  };
}
