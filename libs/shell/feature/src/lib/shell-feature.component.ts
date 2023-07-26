import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellUiHeaderComponent } from '@snarbanking-workspace/shell/ui/header';
import { ShellUiNavComponent } from '@snarbanking-workspace/shell/ui/nav';
import { Store } from '@ngrx/store';
import { selectTitle } from '@snarbanking-workspace/shared/data-access';

@Component({
  selector: 'snarbanking-workspace-shell-feature',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ShellUiHeaderComponent,
    ShellUiNavComponent,
  ],
  templateUrl: './shell-feature.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellFeatureComponent {
  private store = inject(Store);
  pageTitle$ = this.store.select(selectTitle);
}
