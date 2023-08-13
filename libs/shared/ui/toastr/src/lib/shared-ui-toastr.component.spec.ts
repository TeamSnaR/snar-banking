import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiToastrComponent } from './shared-ui-toastr.component';
import { UI_TOASTR_CONFIG, UiToastrConfig } from './ui-toastr.service';

describe('SharedUiToastrComponent', () => {
  let component: SharedUiToastrComponent;
  let fixture: ComponentFixture<SharedUiToastrComponent>;
  let toastrConfig: UiToastrConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiToastrComponent],
      providers: [
        {
          provide: UI_TOASTR_CONFIG,
          useValue: {
            message: 'mock message',
            title: 'mock title',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiToastrComponent);
    toastrConfig = TestBed.inject(UI_TOASTR_CONFIG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
