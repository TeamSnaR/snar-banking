import { AnimationEvent } from '@angular/animations';
import { DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { filter, take, tap } from 'rxjs';
import { SlideOutContainerComponent } from './slide-out-container';

@Injectable({ providedIn: 'root' })
export class SlideOutRef<TResult> {
  constructor(
    private readonly dialogRef: DialogRef<TResult>,
    private readonly container: SlideOutContainerComponent
  ) {
    this.dialogRef.backdropClick.pipe(take(1)).subscribe(() => {
      this.close();
    });
  }

  close(result?: TResult) {
    this.handleAnimationSubscription(result);

    this.container.startExitAnimation();
  }

  private handleAnimationSubscription(result: TResult | undefined) {
    this.container.animationStateChanged
      .pipe(
        filter((event: AnimationEvent) => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(() => {
        this.dialogRef.overlayRef.detachBackdrop();
      });

    this.container.animationStateChanged
      .pipe(
        filter(
          (event: AnimationEvent) =>
            event.phaseName === 'done' && event.toState === 'close'
        ),
        take(1)
      )
      .subscribe(() => {
        this.dialogRef.close(result);
      });
  }
}
