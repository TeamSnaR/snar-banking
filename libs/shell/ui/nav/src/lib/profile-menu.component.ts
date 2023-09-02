import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'snarbanking-workspace-shell-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule],
  template: `
    <div>
      <button
        type="button"
        class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
        [cdkMenuTriggerFor]="userMenu"
        [cdkMenuPosition]="[
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          }
        ]"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </button>
    </div>

    <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
    <ng-template #userMenu>
      <div
        id="user-menu"
        class="mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        cdkMenu
      >
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-0"
          cdkMenuItem
          >Your Profile</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-1"
          cdkMenuItem
          >Settings</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-2"
          cdkMenuItem
          >Sign out</a
        >
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        @apply relative ml-3;
      }
    `,
  ],
})
export class ProfileMenuComponent {}
