import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { ShellUiNavStore } from './shell-ui-nav.store';

@Component({
  selector: 'snarbanking-workspace-shell-ui-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, OverlayModule],
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
  #store = inject(ShellUiNavStore);
  showUserMenu$ = this.#store.showUserMenu$;

  toggleUserMenu() {
    this.#store.toggleUserMenu();
  }
}
