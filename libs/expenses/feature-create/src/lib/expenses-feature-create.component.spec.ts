import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureCreateComponent } from './expenses-feature-create.component';

describe('ExpensesFeatureCreateComponent', () => {
  let component: ExpensesFeatureCreateComponent;
  let fixture: ComponentFixture<ExpensesFeatureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeatureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
