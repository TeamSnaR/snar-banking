import { DialogRef } from '@angular/cdk/dialog';
import { Injectable, Type, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { SlideOutService } from '@snarbanking-workspace/shared/ui';
import { Observable, concatMap, of } from 'rxjs';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import { ExpenseFormData } from '@snarbanking-workspace/expenses/ui-forms';

export const createDefaultExpenseData: () => ExpensesEntity = () => {
  const today = new Date().toISOString().slice(0, 10);
  const defaultCurrency = 'GBP';
  const defaultStore = 'Lidl';
  const defaultCategory = 'Grocery';
  return {
    id: Math.random().toString(36).substring(7),
    description: `${defaultStore} ${defaultCategory} ${today}`,
    amount: {
      currency: defaultCurrency,
      value: 0.0,
    },
    store: defaultStore,
    category: defaultCategory,
    purchaseDate: today,
    items: [],
  };
};

export const createExpenseFormData = (
  expenseEntity: ExpensesEntity
): ExpenseFormData => {
  const purchaseDate = new Date(expenseEntity.purchaseDate);
  const expenseFormData = {
    description: expenseEntity.description,
    value: expenseEntity.amount.value,
    currency: expenseEntity.amount.currency,
    category: expenseEntity.category,
    store: expenseEntity.store,
    purchaseDate: expenseEntity.purchaseDate,
    year: purchaseDate.getFullYear(),
    month: purchaseDate.getMonth() + 1,
    day: purchaseDate.getDate(),
  };
  return expenseFormData;
};
export type FeatureViewState = {
  dialogRef?: DialogRef;
};

@Injectable()
export class FeatureViewPresenter extends ComponentStore<FeatureViewState> {
  slideOut = inject(SlideOutService);
  constructor() {
    super({});

    this.vm$ = this.select((state) => state);
  }

  readonly vm$;

  #store = inject(Store);

  readonly addExpense = this.effect(
    ($: Observable<{ component: Type<unknown>; id: string | null }>) => {
      return $.pipe(
        concatMap(({ component, id }) =>
          of({
            expenseFormData: createExpenseFormData(createDefaultExpenseData()),
            component,
          })
        ),
        tapResponse(
          ({ component, expenseFormData }) => {
            this.openSlideOut({ component, expenseFormData });
          },
          (error) => console.error(error)
        )
      );
    }
  );

  readonly openSlideOut = this.effect(
    (
      $: Observable<{
        component: Type<unknown>;
        expenseFormData: ExpenseFormData;
      }>
    ) => {
      return $.pipe(
        concatMap(({ component, expenseFormData }) => {
          return this.slideOut.open(component, expenseFormData).closed;
        }),
        tapResponse(
          (dialogResult) => {
            if (dialogResult) {
              console.log('save expense', dialogResult);
            }
          },
          (error) => console.error(error)
        )
      );
    }
  );
}
