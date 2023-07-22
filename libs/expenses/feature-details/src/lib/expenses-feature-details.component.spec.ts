import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureDetailsComponent } from './expenses-feature-details.component';

describe('ExpensesFeatureDetailsComponent', () => {
  let component: ExpensesFeatureDetailsComponent;
  let fixture: ComponentFixture<ExpensesFeatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
