import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  HostBinding,
  HostListener,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  IAnimatedDialogConfig,
  UtilDialogRef,
} from './util-dialog-ref.service';
import { DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import {
  CdkPortalOutletAttachedRef,
  ComponentPortal,
  Portal,
  PortalModule,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
const ANIMATION_TIMINGS = '500ms ease-in-out';
@Component({
  selector: 'snarbanking-workspace-util-dialog-container',
  templateUrl: './util-dialog-container.component.html',
  styles: [
    `
      :host {
        display: block;
        @apply h-full flex flex-col divide-y divide-gray-200 bg-white shadow-xl;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, DialogModule, PortalModule],
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
export class UtilDialogContainerComponent
  implements AfterViewInit, IAnimatedDialogConfig
{
  @HostBinding('@slideInOut')
  animationState: 'void' | 'open' | 'closed' = 'open';
  @HostListener('@slideInOut.start', ['$event'])
  onAnimationStart($event: AnimationEvent) {
    this.animationStateChanged.emit($event);
  }
  @HostListener('@slideInOut.done', ['$event'])
  onAnimationDone($event: AnimationEvent) {
    this.animationStateChanged.emit($event);
  }

  animationStateChanged = new EventEmitter<AnimationEvent>();
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
    if (this.dialogData.content.component) {
      this.contentPortal = new ComponentPortal(
        this.dialogData.content.component,
        this.#viewContainerRef
      );
    } else {
      this.contentPortal = new TemplatePortal(
        this.defaultContentTemplate,
        this.#viewContainerRef
      );
    }
    this.cdr.detectChanges();
  }

  startExitAnimation() {
    this.animationState = 'closed';
    this.cdr.detectChanges();
  }

  contentAttached(ref: CdkPortalOutletAttachedRef) {
    // key to success
    // reference: https://stackoverflow.com/questions/47469844/angular-cdk-how-to-set-inputs-in-a-componentportal
    // there is also a setInput() method on ComponentRef
    (
      ref as ComponentRef<typeof this.dialogData.content.component>
    ).changeDetectorRef.detectChanges();
  }
}
