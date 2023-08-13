import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UI_TOASTR_CONFIG } from './ui-toastr.service';

@Component({
  selector: 'snarbanking-workspace-shared-ui-toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-ui-toastr.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiToastrComponent {
  public uiToastrConfig = inject(UI_TOASTR_CONFIG);
}
