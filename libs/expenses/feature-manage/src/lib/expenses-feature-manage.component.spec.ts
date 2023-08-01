import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureManageComponent } from './expenses-feature-manage.component';

describe('ExpensesFeatureManageComponent', () => {
  let component: ExpensesFeatureManageComponent;
  let fixture: ComponentFixture<ExpensesFeatureManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureManageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeatureManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
