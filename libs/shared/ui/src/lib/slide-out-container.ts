import { CdkDialogContainer } from '@angular/cdk/dialog';
import { PortalModule } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';
import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  standalone: true,
  imports: [PortalModule],
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      state('close', style({ transform: 'translateX(100%)' })),
      transition('void => open', animate('300ms ease-in-out')),
      transition('open => close', animate('500ms ease-in-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideOutContainerComponent extends CdkDialogContainer {
  @HostBinding('@slideInOut')
  animationState: 'void' | 'open' | 'close' = 'open';
  @HostListener('@slideInOut.done', ['$event'])
  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }
  @HostListener('@slideInOut.start', ['$event'])
  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  animationStateChanged = new EventEmitter<AnimationEvent>();

  startExitAnimation() {
    this.animationState = 'close';
  }
}
