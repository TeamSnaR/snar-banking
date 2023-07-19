import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellUiHeaderComponent } from './shell-ui-header.component';

describe('ShellUiHeaderComponent', () => {
  let component: ShellUiHeaderComponent;
  let fixture: ComponentFixture<ShellUiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellUiHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellUiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
