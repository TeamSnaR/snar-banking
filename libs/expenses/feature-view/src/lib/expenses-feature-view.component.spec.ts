import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureViewComponent } from './expenses-feature-view.component';

describe('ExpensesFeatureViewComponent', () => {
  let component: ExpensesFeatureViewComponent;
  let fixture: ComponentFixture<ExpensesFeatureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeatureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
