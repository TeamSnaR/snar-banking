import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiToastrComponent } from './shared-ui-toastr.component';
import {
  UTIL_TOASTR_CONFIG,
  UtilToastrConfig,
} from '@snarbanking-workspace/shared/utils/toastr';

describe('SharedUiToastrComponent', () => {
  let component: SharedUiToastrComponent;
  let fixture: ComponentFixture<SharedUiToastrComponent>;
  let toastrConfig: UtilToastrConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiToastrComponent],
      providers: [
        {
          provide: UTIL_TOASTR_CONFIG,
          useValue: {
            message: 'mock message',
            title: 'mock title',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiToastrComponent);
    toastrConfig = TestBed.inject(UTIL_TOASTR_CONFIG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
