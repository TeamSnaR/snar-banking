import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ShellUiNavStore } from './shell-ui-nav.store';
@Component({
  selector: 'snarbanking-workspace-shell-ui-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule],
  templateUrl: './shell-ui-nav.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ShellUiNavStore],
})
export class ShellUiNavComponent {
  #shellUiNavStore = inject(ShellUiNavStore);

  navItems$ = this.#shellUiNavStore.navItems$;

  trackByFn = (index: number, item: any) => item.id;
}
