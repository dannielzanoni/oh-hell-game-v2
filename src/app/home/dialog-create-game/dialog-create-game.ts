import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardCheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { ZardComboboxComponent, ZardComboboxOption } from '@shared/components/combobox/combobox.component';
import { LobbyService } from 'src/app/services/lobby.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'dialog-create-game',
  templateUrl: './dialog-create-game.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ZardInputDirective,
    ZardCheckboxComponent,
    ZardComboboxComponent
  ],
})
export class DialogCreateGame {
  constructor(private lobbyService: LobbyService, private router: Router) {}

  form = new FormGroup({
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

  async onSubmit() {
      if (this.form.invalid) return;

      const request = {
        maxPlayers: Number(this.form.value.maxPlayers),
        maxLifesPerPlayer: Number(this.form.value.maxLifePerPlayers),
        privateRoom: this.form.value.privateRoom ?? false,
        password: this.form.value.roomPassword || undefined,
      };

      try {
        const lobby = await firstValueFrom(this.lobbyService.createGame(request));
        this.router.navigate(['/game', lobby.lobby_id]);
      } catch (err) {
        console.error('Error in creating lobby:', err);
      }
  }
}
