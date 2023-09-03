import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeaturePersonalBudgetComponent } from './expenses-feature-personal-budget.component';

describe('ExpensesFeaturePersonalBudgetComponent', () => {
  let component: ExpensesFeaturePersonalBudgetComponent;
  let fixture: ComponentFixture<ExpensesFeaturePersonalBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeaturePersonalBudgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeaturePersonalBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
