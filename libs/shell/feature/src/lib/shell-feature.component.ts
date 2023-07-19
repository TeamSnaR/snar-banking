import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellUiHeaderComponent } from '@snarbanking-workspace/shell/ui/header';

@Component({
  selector: 'snarbanking-workspace-shell-feature',
  standalone: true,
  imports: [CommonModule, RouterModule, ShellUiHeaderComponent],
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
export class ShellFeatureComponent {}
