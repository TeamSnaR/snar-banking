import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

type Money = {
  value: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'SEK';
};
type IncomeType = 'projected' | 'actual';
type MonthlyIncome<IncomeType extends string> = {
  description: string;
  amount: Money;
  type: IncomeType;
};
type CategorizedMonthlyIncome<IncomeType extends string> = {
  [key in IncomeType]: {
    total: Money;
    incomes: MonthlyIncome<IncomeType>[];
  };
};
type ExpenseCategory =
  | 'food'
  | 'housing'
  | 'transportation'
  | 'utilities'
  | 'loans'
  | 'insurance'
  | 'medical'
  | 'savings'
  | 'personal care'
  | 'entertainment'
  | 'pets'
  | 'taxes'
  | 'donations';
type ExpenseItem = {
  description: string;
  category: ExpenseCategory;
  projectedCost: Money;
  actualCost: Money;
};
type ExpenseItemWithDifference = ExpenseItem & {
  difference: Money;
};
type CategorizedExpenseItemWithDifference = {
  [key in ExpenseCategory]: {
    totalProjectedCost: Money;
    totalActualCost: Money;
    totalDifference: Money;
    expenses: ExpenseItemWithDifference[];
  };
};
type PersonalBudgetState = {
  monthlyIncomes: Array<MonthlyIncome<IncomeType>>;
  monthlyExpenses: Array<ExpenseItem>;
};

const INITIAL_STATE: PersonalBudgetState = {
  monthlyIncomes: [
    {
      description: 'Salary',
      amount: { value: 70000, currency: 'SEK' },
      type: 'projected',
    },
    {
      description: 'Salary',
      amount: { value: 63000, currency: 'SEK' },
      type: 'actual',
    },
  ],
  monthlyExpenses: [
    {
      description: 'Rent',
      category: 'housing',
      projectedCost: { value: 15000, currency: 'SEK' },
      actualCost: { value: 13000, currency: 'SEK' },
    },
    {
      description: 'Electricity',
      category: 'housing',
      projectedCost: { value: 1500, currency: 'SEK' },
      actualCost: { value: 1500, currency: 'SEK' },
    },
    {
      description: 'Food',
      category: 'food',
      projectedCost: { value: 5000, currency: 'SEK' },
      actualCost: { value: 5000, currency: 'SEK' },
    },
    {
      description: 'Transportation',
      category: 'transportation',
      projectedCost: { value: 2000, currency: 'SEK' },
      actualCost: { value: 2000, currency: 'SEK' },
    },
    {
      description: 'Utilities',
      category: 'utilities',
      projectedCost: { value: 2000, currency: 'SEK' },
      actualCost: { value: 2000, currency: 'SEK' },
    },
    {
      description: 'Taxes',
      category: 'taxes',
      projectedCost: { value: 21445, currency: 'SEK' },
      actualCost: { value: 20441, currency: 'SEK' },
    },
  ],
};

export class PersonalBudgetStore extends ComponentStore<PersonalBudgetState> {
  constructor() {
    super(INITIAL_STATE);
  }

  readonly categorizedIncomes$ = this.select((state) => {
    return state.monthlyIncomes.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = {
          total: { ...curr.amount, value: 0 },
          incomes: [curr],
        };
      } else {
        acc[curr.type].incomes.push(curr);
      }
      acc[curr.type].total.value += curr.amount.value;
      return acc;
    }, {} as CategorizedMonthlyIncome<IncomeType>);
  });

  readonly expensesWithDifference$ = this.select((state) => {
    return state.monthlyExpenses.reduce((acc, curr) => {
      const difference = curr.projectedCost.value - curr.actualCost.value;
      const expenseWithDifference = {
        ...curr,
        difference: {
          value: difference,
          currency: curr.projectedCost.currency,
        },
      };
      acc.push(expenseWithDifference);
      return acc;
    }, [] as ExpenseItemWithDifference[]);
  });

  readonly categorizedExpensesWithDifference$ = this.select(
    this.expensesWithDifference$,
    (expensesWithDifference) => {
      return expensesWithDifference.reduce((acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = {
            totalProjectedCost: { ...curr.projectedCost, value: 0 },
            totalActualCost: { ...curr.actualCost, value: 0 },
            totalDifference: { ...curr.difference, value: 0 },
            expenses: [curr],
          };
        } else {
          acc[curr.category].expenses.push(curr);
        }
        acc[curr.category].totalProjectedCost.value += curr.projectedCost.value;
        acc[curr.category].totalActualCost.value += curr.actualCost.value;
        acc[curr.category].totalDifference.value += curr.difference.value;
        return acc;
      }, {} as CategorizedExpenseItemWithDifference);
    }
  );

  readonly totalExpense$ = this.select(
    this.expensesWithDifference$,
    (expensesWithDifference) => {
      return expensesWithDifference.reduce(
        (acc, curr) => {
          acc.projected = {
            value: acc.projected.value + curr.projectedCost.value,
            currency: curr.projectedCost.currency,
          };
          acc.actual = {
            value: acc.actual.value + curr.actualCost.value,
            currency: curr.actualCost.currency,
          };
          acc.difference = {
            value: acc.difference.value + curr.difference.value,
            currency: curr.difference.currency,
          };
          return acc;
        },
        {
          projected: { value: 0, currency: 'SEK' },
          actual: { value: 0, currency: 'SEK' },
          difference: { value: 0, currency: 'SEK' },
        }
      );
    }
  );

  readonly totalBalance$ = this.select(
    this.categorizedIncomes$,
    this.totalExpense$,
    (categorizedIncomes, totalExpense) => {
      const projectedIncome = categorizedIncomes['projected'].total.value;
      const actualIncome = categorizedIncomes['actual'].total.value;
      const projectedBalance = {
        value: projectedIncome - totalExpense.projected.value,
        currency: totalExpense.projected.currency,
      };
      const actualBalance = {
        value: actualIncome - totalExpense.actual.value,
        currency: totalExpense.actual.currency,
      };
      const difference = {
        value: actualBalance.value - projectedBalance.value,
        currency: projectedBalance.currency,
      };
      return {
        projected: projectedBalance,
        actual: actualBalance,
        difference,
      };
    }
  );

  readonly vm$ = this.select(
    this.categorizedIncomes$,
    this.categorizedExpensesWithDifference$,
    this.totalExpense$,
    this.totalBalance$,
    (
      categorizedIncomes,
      categorizedExpensesWithDifference,
      totalExpense,
      totalBalance
    ) => ({
      categorizedIncomes,
      categorizedExpensesWithDifference,
      totalExpense,
      totalBalance,
      incomeTypes: Object.keys(categorizedIncomes) as IncomeType[],
      expenseCategories: Object.keys(
        categorizedExpensesWithDifference
      ) as ExpenseCategory[],
    })
  );
}
