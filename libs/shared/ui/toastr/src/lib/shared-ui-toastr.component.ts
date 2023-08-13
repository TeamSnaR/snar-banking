import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UTIL_TOASTR_CONFIG } from '@snarbanking-workspace/shared/utils/toastr';

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
  public uiToastrConfig = inject(UTIL_TOASTR_CONFIG);
}
