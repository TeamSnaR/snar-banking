import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDialogContainer, DIALOG_DATA } from '@angular/cdk/dialog';
import { CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'snarbanking-workspace-expenses-ui-expense-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-ui-expense-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesUiExpenseFormComponent {
  @Input() contentData: { text: string } | undefined;
  dialogData = inject(DIALOG_DATA);
}

@Component({
  selector: 'snarbanking-workspace-expenses-ui-expense-form-container',
  standalone: true,
  imports: [PortalModule, CommonModule],
  template: `
    <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll pt-6">
      <header class="px-4 sm:px-6">
        <div class="flex items-start justify-between">
          <h2>Header section</h2>
          <div class="ml-3 flex h-7 items-center">
            <button
              type="button"
              class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span class="absolute -inset-2.5"></span>
              <span class="sr-only">Close panel</span>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div class="relative mt-6 flex-1 px-4 sm:px-6">
        <ng-container *cdkPortalOutlet></ng-container>
      </div>
    </div>
    <footer class="flex flex-shrink-0 justify-end px-4 py-4">
      <button
        type="button"
        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Save
      </button>
    </footer>
  `,
  styles: [
    `
      :host {
        @apply w-full h-full flex flex-col divide-y divide-gray-200 bg-white shadow-xl;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseFormContainerComponent extends CdkDialogContainer {
  @ViewChild(CdkPortalOutlet, { static: true })
  override _portalOutlet!: CdkPortalOutlet;
}
