import { DialogRef } from '@angular/cdk/dialog';
import { Injectable, Type, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { SlideOutService } from '@snarbanking-workspace/shared/ui';
import { Observable, concatMap, of, tap } from 'rxjs';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';
import {
  ExpenseFormData,
  ManageExpenseFormComponent,
} from '@snarbanking-workspace/expenses/ui-forms';
import * as fromActions from '@snarbanking-workspace/expenses/data-access';
import * as fromSelectors from '@snarbanking-workspace/expenses/data-access';
import { concatLatestFrom } from '@ngrx/effects';

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
    amount: expenseEntity.amount.value,
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
  #slideOut = inject(SlideOutService);
  #store = inject(Store);
  constructor() {
    super({});

    this.vm$ = this.select((state) => state);
  }

  readonly vm$;

  readonly addExpense = this.effect(
    (
      source$: Observable<{
        id: string | null;
      }>
    ) => {
      return source$.pipe(
        concatMap(({ id }) =>
          of({
            expenseEntityData: createDefaultExpenseData(),
          })
        ),
        tapResponse(
          ({ expenseEntityData }) =>
            this.openExpenseSlideOut({ expenseEntityData }),
          (error) => console.error(error)
        )
      );
    }
  );

  readonly editExpense = this.effect<string | number>(
    (source$: Observable<string | number>) =>
      source$.pipe(
        tap((id) =>
          this.#store.dispatch(fromActions.getExpenseDetails({ id }))
        ),
        concatLatestFrom((id) =>
          this.#store.select(fromSelectors.selectEntity)
        ),
        tapResponse(
          ([id, expenseEntityData]) => {
            if (expenseEntityData) {
              this.openExpenseSlideOut({ expenseEntityData });
            }
          },
          (error) => console.error(error)
        )
      )
  );

  readonly openExpenseSlideOut = this.effect(
    (
      source$: Observable<{
        expenseEntityData: ExpensesEntity;
      }>
    ) => {
      return source$.pipe(
        concatMap(({ expenseEntityData }) => {
          const dialogRef = this.#slideOut.open<
            ExpensesEntity,
            ExpensesEntity,
            ManageExpenseFormComponent
          >(ManageExpenseFormComponent, expenseEntityData);

          return dialogRef.closed;
        }),
        tapResponse(
          (dialogResult: ExpensesEntity | undefined) => {
            if (dialogResult) {
              console.log(dialogResult);
              if (String(dialogResult.id).length > 6) {
                this.#store.dispatch(
                  fromActions.updateExpense({ expenseData: dialogResult })
                );
              } else {
                this.#store.dispatch(
                  fromActions.addExpense({ expenseData: dialogResult })
                );
              }
            }
          },
          (error) => console.error(error)
        )
      );
    }
  );
}
