/**
 * Interface for the 'Expenses' data
 */
export interface ExpensesEntity {
  id: string | number; // Primary ID
  description: string;
  amount: Money;
  category: string;
  store: string;
  items: ExpenseItemEntity[];
}

export interface Money {
  currency: string;
  value: number;
}

export interface ExpenseItemEntity {
  id: string;
  description: string;
  pricePerUnit: Money;
  Quantity: number;
  SubCategory: string;
  UnitOfMeasure: string;
}
