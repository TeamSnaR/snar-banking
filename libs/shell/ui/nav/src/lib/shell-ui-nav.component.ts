import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'snarbanking-workspace-shell-ui-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
export class ShellUiNavComponent {}
