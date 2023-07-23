import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureDetailsComponent } from './expenses-feature-details.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ExpensesFeatureDetailsComponent', () => {
  let component: ExpensesFeatureDetailsComponent;
  let fixture: ComponentFixture<ExpensesFeatureDetailsComponent>;
  let store: MockStore;
  const initialState = { expenses: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureDetailsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
