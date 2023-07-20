import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'snarbanking-workspace-shell-ui-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell-ui-header.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellUiHeaderComponent {
  @Input()
  headerText!: string;
}
