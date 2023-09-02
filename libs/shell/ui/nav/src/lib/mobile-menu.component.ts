import { Component, inject } from '@angular/core';
import { ShellUiNavStore } from './shell-ui-nav.store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'snarbanking-workspace-shell-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule],
  template: `
    <!-- Mobile menu button -->
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      aria-controls="mobile-menu"
      aria-expanded="false"
      [cdkMenuTriggerFor]="mobileMenu"
      [cdkMenuPosition]="[
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          panelClass: ['static', 'mt-14']
        }
      ]"
      (cdkMenuClosed)="menuClosed()"
      (cdkMenuOpened)="menuOpened()"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="h-6 w-6"
        [ngClass]="mobileMenuTriggerBurgerIcon$ | async"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <svg
        class="h-6 w-6"
        [ngClass]="mobileMenuTriggerCloseIcon$ | async"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <!-- Mobile menu, show/hide based on menu state. -->
    <ng-template #mobileMenu>
      <div
        class="md:hidden"
        id="mobile-menu"
        class="bg-gray-800 w-full"
        cdkMenu
      >
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <ng-container
            *ngFor="let navItem of navItems$ | async"
            trackBy="trackByFn"
          >
            <a
              [routerLink]="[navItem.route]"
              [routerLinkActive]="['bg-gray-900', 'text-white']"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              cdkMenuItem
              >{{ navItem.label }}</a
            >
          </ng-container>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">Tom Cook</div>
              <div class="text-sm font-medium text-gray-400">
                tom@example.com
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >Your Profile</a
            >
            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >Settings</a
            >
            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >Sign out</a
            >
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        @apply mr-2 flex md:hidden;
      }
    `,
  ],
  providers: [ShellUiNavStore],
})
export class MobileMenuComponent {
  #shellUiNavStore = inject(ShellUiNavStore);

  navItems$ = this.#shellUiNavStore.navItems$;
  mobileMenuTriggerBurgerIcon$ =
    this.#shellUiNavStore.mobileMenuTriggerBurgerIcon$;

  mobileMenuTriggerCloseIcon$ =
    this.#shellUiNavStore.mobileMenuTriggerCloseIcon$;

  trackByFn = (index: number, item: any) => item.id;
  menuOpened = () => this.#shellUiNavStore.openMenu();
  menuClosed = () => this.#shellUiNavStore.closeMenu();
}
