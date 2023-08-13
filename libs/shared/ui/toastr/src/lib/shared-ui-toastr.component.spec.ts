import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiToastrComponent } from './shared-ui-toastr.component';

describe('SharedUiToastrComponent', () => {
  let component: SharedUiToastrComponent;
  let fixture: ComponentFixture<SharedUiToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiToastrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
