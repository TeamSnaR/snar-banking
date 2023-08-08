import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageExpenseFormComponent } from './manage-expense-form.component';
import { ExpenseFormStore } from './expense-form.store';
import { ExpensesEntity } from '@snarbanking-workspace/expenses/data-access';

describe('ManageExpenseFormComponent', () => {
  let component: ManageExpenseFormComponent;
  let fixture: ComponentFixture<ManageExpenseFormComponent>;
  const createExpensesEntity = (id: string, description = '') =>
    ({
      id,
      description: description || `name-${id}`,
      amount: {
        currency: 'GBP',
        value: 1.0,
      },
      category: 'Grocery',
      store: 'Lidl',
      items: [],
      purchaseDate: new Date().toISOString(),
    } as ExpensesEntity);

  const mockExpenseFormStore = {
    initialize: jest.fn(),
    selectYear: jest.fn(),
    selectMonth: jest.fn(),
  } as unknown as ExpenseFormStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExpenseFormComponent],
      providers: [
        { provide: ExpenseFormStore, useValue: mockExpenseFormStore },
      ],
    }).compileComponents();

    TestBed.inject(ExpenseFormStore);
    fixture = TestBed.createComponent(ManageExpenseFormComponent);
    component = fixture.componentInstance;
    component.expenseEntity = createExpensesEntity('1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
