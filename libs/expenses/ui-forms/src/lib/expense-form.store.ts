import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ExpenseFormData } from './expense-form-data';

export type ExpenseFormState = {
  years: number[];
  months: { value: number; name: string }[];
  purchaseDate: {
    year: number;
    month: number;
    day: number;
  };
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
}
