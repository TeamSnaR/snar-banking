import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Portal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import {
  IAnimatedDialogConfig,
  UtilDialogRef,
} from '@snarbanking-workspace/shared/util-dialog';

const ANIMATION_TIMINGS = '500ms ease-in-out';
@Component({
  selector: 'snarbanking-workspace-expenses-ui-expense-form',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './expenses-ui-expense-form.component.html',
  styles: [
    `
      :host {
        display: block;
        @apply pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(100%)' })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ]),
  ],
})
export class ExpensesUiExpenseFormComponent
  implements AfterViewInit, IAnimatedDialogConfig
{
  animationStateChanged = new EventEmitter<AnimationEvent>();
  dialogRef = inject(DialogRef);
  utilDialogRef = inject(UtilDialogRef);
  dialogData = inject(DIALOG_DATA);
  cdr = inject(ChangeDetectorRef);
  #viewContainerRef = inject(ViewContainerRef);
  headerPortal: Portal<unknown> | undefined;
  @ViewChild('defaultHeader', { static: true })
  defaultHeaderTemplate!: TemplateRef<unknown>;
  footerPortal: Portal<unknown> | undefined;
  @ViewChild('defaultFooter', { static: true })
  defaultFooterTemplate!: TemplateRef<unknown>;
  contentPortal: Portal<unknown> | undefined;
  @ViewChild('contentPlaceholder', { static: true })
  defaultContentTemplate!: TemplateRef<unknown>;
  animationState: 'void' | 'open' | 'closed' = 'open';

  ngAfterViewInit(): void {
    this.headerPortal = new TemplatePortal(
      this.defaultHeaderTemplate,
      this.#viewContainerRef,
      {
        header: {
          title: this.dialogData.title,
        },
      }
    );
    this.footerPortal = new TemplatePortal(
      this.defaultFooterTemplate,
      this.#viewContainerRef,
      {
        footerData: {
          buttonCancel: {
            text: 'Cancel',
          },
          buttonSubmit: {
            text: 'Save',
          },
        },
      }
    );
    this.contentPortal = new TemplatePortal(
      this.defaultContentTemplate,
      this.#viewContainerRef
    );
  }

  onAnimationStart($event: AnimationEvent) {
    this.animationStateChanged.emit($event);
  }

  onAnimationDone($event: AnimationEvent) {
    this.animationStateChanged.emit($event);
  }

  startExitAnimation() {
    this.animationState = 'closed';
    this.cdr.markForCheck();
  }
}
