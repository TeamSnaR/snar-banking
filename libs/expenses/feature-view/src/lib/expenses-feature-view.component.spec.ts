import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureViewComponent } from './expenses-feature-view.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ExpensesFeatureViewComponent', () => {
  let component: ExpensesFeatureViewComponent;
  let fixture: ComponentFixture<ExpensesFeatureViewComponent>;
  let store: MockStore;
  const initialState = { expenses: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureViewComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ExpensesFeatureViewComponent);
    component = fixture.componentInstance;
    component.expensesStore = store;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
