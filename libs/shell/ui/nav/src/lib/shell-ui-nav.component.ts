import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

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
})
export class ShellUiNavComponent {
  showUserMenu = false;

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    console.log('toggleUserMenu', this.showUserMenu);
  }
}
