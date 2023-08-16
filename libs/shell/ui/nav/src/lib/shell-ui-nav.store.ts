import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { pipe, tap, throttle, throttleTime, withLatestFrom } from 'rxjs';

export type NavItem = {
  label: string;
  route: string;
};
export type ShellUiNavState = {
  navItems: NavItem[];
  showUserMenu: boolean;
};
@Injectable()
export class ShellUiNavStore extends ComponentStore<ShellUiNavState> {
  constructor() {
    super({ navItems: [], showUserMenu: false });
  }

  readonly navItems$ = this.select((state) => state.navItems);

  readonly setNavItems = this.updater((state, navItems: NavItem[]) => ({
    ...state,
    navItems,
  }));

  readonly showUserMenu$ = this.select((state) => state.showUserMenu);

  readonly toggleUserMenu = this.effect(($) =>
    $.pipe(
      throttleTime(250),
      concatLatestFrom(() => this.state$),
      tap(([, state]) => {
        this.patchState({ showUserMenu: !state.showUserMenu });
      })
    )
  );
}
