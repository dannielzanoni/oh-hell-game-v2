import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardCheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { ZardComboboxComponent, ZardComboboxOption } from '@shared/components/combobox/combobox.component';

@Component({
  standalone: true,
  selector: 'dialog-create-game',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ZardInputDirective,
    ZardCheckboxComponent,
    ZardComboboxComponent
  ],
  template: `
    <form [formGroup]="form" class="grid gap-4">
      <!-- MAX PLAYERS -->
      <div class="grid gap-3 z-select-dropdown" (click)="$event.stopPropagation()">
        <label for="maxPlayers" class="flex items-center gap-2 text-sm leading-none font-medium">
          Max Players
        </label>

        <z-combobox
          [options]="maxPlayersOptions"
          class="w-[200px]"
          placeholder="Select max players..."
          searchPlaceholder="Search number..."
          emptyText="No options found."
          (zOnSelect)="onSelect($event)"
          formControlName="maxPlayers"
        />
      </div>

      <!-- MAX LIFES PER PLAYERS -->
      <div class="grid gap-3 z-select-dropdown" (click)="$event.stopPropagation()">
        <label for="maxLifePerPlayers" class="flex items-center gap-2 text-sm leading-none font-medium">
          Max Lifes Per Players
        </label>

        <z-combobox
          [options]="maxLifesPerPlayersOptions"
          class="w-[200px]"
          placeholder="Select max life per player..."
          searchPlaceholder="Search number..."
          emptyText="No options found."
          (zOnSelect)="onSelectLife($event)"
          formControlName="maxLifePerPlayers"
        />
      </div>

      <!-- PRIVATE ROOM -->
      <div class="grid gap-3">
        <span z-checkbox zType="destructive" formControlName="privateRoom">
          Private Room
        </span>
      </div>

      <!-- PASSWORD INPUT -->
      <div class="grid gap-3" *ngIf="form.get('privateRoom')?.value">
        <label for="roomPassword" class="flex items-center gap-2 text-sm leading-none font-medium">
          Room Password
        </label>
        <input
          id="roomPassword"
          z-input
          type="password"
          placeholder="Enter room password..."
          formControlName="roomPassword"
        />
      </div>
    </form>
  `,
})
export class DialogCreateGame {
  form = new FormGroup({
    gameName: new FormControl(''),
    maxPlayers: new FormControl('10'),
    maxLifePerPlayers: new FormControl('5'),
    privateRoom: new FormControl(false),
    roomPassword: new FormControl(''),
  });

  maxPlayersOptions: ZardComboboxOption[] = [
    { value: '3', label: '3 Players' },
    { value: '4', label: '4 Players' },
    { value: '5', label: '5 Players' },
    { value: '6', label: '6 Players' },
    { value: '7', label: '7 Players' },
    { value: '8', label: '8 Players' },
    { value: '9', label: '9 Players' },
    { value: '10', label: '10 Players' },
  ];

  maxLifesPerPlayersOptions: ZardComboboxOption[] = [
    { value: '3', label: '❤️ 3 Lifes' },
    { value: '4', label: '❤️ 4 Lifes' },
    { value: '5', label: '❤️ 5 Lifes' },
    { value: '6', label: '❤️ 6 Lifes' },
    { value: '7', label: '❤️ 7 Lifes' },
    { value: '8', label: '❤️ 8 Lifes' },
    { value: '9', label: '❤️ 9 Lifes' },
    { value: '10', label: '❤️ 10 Lifes' },
  ];

  onSelect(option: ZardComboboxOption) {
    this.form.patchValue({ maxPlayers: option.value });
  }

  onSelectLife(option: ZardComboboxOption) {
    this.form.patchValue({ maxLifePerPlayers: option.value });
  }
}
