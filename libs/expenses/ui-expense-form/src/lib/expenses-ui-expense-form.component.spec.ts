import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesUiExpenseFormComponent } from './expenses-ui-expense-form.component';

describe('ExpensesUiExpenseFormComponent', () => {
  let component: ExpensesUiExpenseFormComponent;
  let fixture: ComponentFixture<ExpensesUiExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesUiExpenseFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesUiExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
