import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageExpenseFormComponent } from './manage-expense-form.component';
import { ExpenseFormStore } from './expense-form.store';
import { ExpenseFormData } from './expense-form-data';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { SlideOutRef } from '@snarbanking-workspace/shared/ui';

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
      imports: [ManageExpenseFormComponent, DialogModule],
      providers: [
        { provide: ExpenseFormStore, useValue: mockExpenseFormStore },
        { provide: SlideOutRef, useValue: {} },
        { provide: DIALOG_DATA, useValue: createExpenseFormData('1') },
      ],
    }).compileComponents();

    TestBed.inject(ExpenseFormStore);
    TestBed.inject(SlideOutRef);
    fixture = TestBed.createComponent(ManageExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
