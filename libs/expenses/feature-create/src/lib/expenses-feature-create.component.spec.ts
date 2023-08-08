import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureCreateComponent } from './expenses-feature-create.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExpensesFeatureCreateComponent', () => {
  let component: ExpensesFeatureCreateComponent;
  let fixture: ComponentFixture<ExpensesFeatureCreateComponent>;
  let store: MockStore;
  const initialState = { expenses: [] }; // declare initialState variable

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureCreateComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ExpensesFeatureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
