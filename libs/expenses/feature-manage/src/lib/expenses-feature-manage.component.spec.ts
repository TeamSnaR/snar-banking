import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesFeatureManageComponent } from './expenses-feature-manage.component';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ExpensesFeatureManageComponent', () => {
  let component: ExpensesFeatureManageComponent;
  let fixture: ComponentFixture<ExpensesFeatureManageComponent>;
  let store: MockStore;
  const initialState = { expenses: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesFeatureManageComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesFeatureManageComponent);
    component = fixture.componentInstance;
    component.store = store;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
