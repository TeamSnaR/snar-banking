import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageExpenseFormComponent } from './manage-expense-form.component';

describe('ManageExpenseFormComponent', () => {
  let component: ManageExpenseFormComponent;
  let fixture: ComponentFixture<ManageExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExpenseFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
