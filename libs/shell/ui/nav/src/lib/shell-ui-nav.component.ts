import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ShellUiNavStore } from './shell-ui-nav.store';
import { MobileMenuComponent } from './mobile-menu.component';
import { ProfileMenuComponent } from './profile-menu.component';
@Component({
  selector: 'snarbanking-workspace-shell-ui-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CdkMenuModule,
    MobileMenuComponent,
    ProfileMenuComponent,
  ],
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
}
