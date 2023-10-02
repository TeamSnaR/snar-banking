import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageExpenseFormComponent } from './manage-expense-form.component';
import { ExpenseFormStore } from './expense-form.store';
import { ExpenseFormData } from './expense-form-data';

describe('ManageExpenseFormComponent', () => {
  let component: ManageExpenseFormComponent;
  let fixture: ComponentFixture<ManageExpenseFormComponent>;
  const createExpenseFormData = (id: string): ExpenseFormData =>
    ({
      id,
      description: 'expenseEntity.description',
      value: 1,
      currency: 'GBP',
      category: 'Grocery',
      store: 'Lidl',
      purchaseDate: new Date().toISOString().slice(0, 10),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    } as ExpenseFormData);

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
    // component.expenseFormData = createExpenseFormData('1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
