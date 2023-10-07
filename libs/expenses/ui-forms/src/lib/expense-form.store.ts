import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ExpenseFormData } from './expense-form-data';
import { NgForm } from '@angular/forms';

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
    })
  );

  constructor() {
    super(INITIAL_STATE);
  }

  readonly initialize = this.updater(
    (state, expenseFormData: ExpenseFormData) => ({
      ...state,
      purchaseDate: {
        year: expenseFormData.year,
        month: expenseFormData.month,
        day: expenseFormData.day,
      },
      expenseFormData,
    })
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

  readonly addExpense = (expenseForm: NgForm): ExpenseFormData => {
    const expenseToAdd = expenseForm.value;
    const expenseFormData = this.get().expenseFormData;
    const expense = {
      description: expenseToAdd.description,
      value: +expenseToAdd.amount,
      currency: expenseFormData!.currency,
      category: expenseToAdd.category,
      store: expenseToAdd.store,
      year: expenseToAdd.year,
      month: expenseToAdd.month,
      day: expenseToAdd.day,
      purchaseDate: new Date(
        expenseToAdd.year,
        expenseToAdd.month,
        expenseToAdd.day
      ).toISOString(),
    };
    return expense;
  };

  readonly resetExpenseForm = (expenseForm: NgForm): void => {
    const expenseFormData = this.get().expenseFormData;
    expenseForm.reset({
      description: expenseFormData?.description,
      amount: 0,
      currency: expenseFormData?.currency,
      category: expenseFormData?.category,
      store: expenseFormData?.store,
      year: expenseFormData?.year,
      month: expenseFormData?.month,
      day: expenseFormData?.day,
    });
  };
}
