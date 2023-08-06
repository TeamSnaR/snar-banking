import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { ExpenseFormData } from './expense-form-data';

export interface ExpenseFormState {
  years: number[];
  months: { value: number; name: string }[];
  currencies: Map<string, string>;
  categories: string[];
  groceryStores: string[];
  purchaseDate: {
    year: number;
    month: number;
    day: number;
  };
  currency: string;
}
const INITIAL_STATE: ExpenseFormState = {
  years: Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i),
  months: Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: new Date(0, i).toLocaleString('en', { month: 'long' }),
  })),
  currencies: new Map([
    ['USD', '$'],
    ['EUR', '€'],
    ['GBP', '£'],
    ['PHP', '₱'],
    ['MYR', 'RM'],
  ]),
  categories: ['Grocery', 'Travel', 'Accommodation', 'Other'],
  groceryStores: [
    'Tesco',
    'Sainsbury',
    'Asda',
    'Morrisons',
    'Waitrose',
    'Lidl',
    'Aldi',
  ],
  purchaseDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },
  currency: 'GBP',
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
  readonly categories$ = this.select((state) => state.categories);
  readonly groceryStores$ = this.select((state) => state.groceryStores);
  readonly currency$ = this.select((state) =>
    state.currencies.get(state.currency)
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
      currency: expenseFormData.currency,
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
