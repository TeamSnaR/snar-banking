import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureCreateComponent } from './expenses-feature-create.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ExpensesFeatureCreateComponent', () => {
  let component: ExpensesFeatureCreateComponent;
  let fixture: ComponentFixture<ExpensesFeatureCreateComponent>;
  let store: MockStore;
  const initialState = { expenses: [] }; // declare initialState variable

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureCreateComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ExpensesFeatureCreateComponent);
    component = fixture.componentInstance;
    component.store = store;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
