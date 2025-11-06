import { Component, inject } from '@angular/core';
import { ZardButtonComponent } from '../shared/components/button/button.component';
import { ZardIconComponent } from '../shared/components/icon/icon.component';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardDialogModule } from '@shared/components/dialog/dialog.component';
import { Z_MODAL_DATA, ZardDialogService } from '@shared/components/dialog/dialog.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { DialogCreateGame } from './dialog-create-game/dialog-create-game';

interface iDialogData {
  name: string;
  username: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ZardButtonComponent,
    ZardIconComponent,
    ZardCardComponent,
    ZardDialogModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  private dialogService = inject(ZardDialogService);

  openDialog() {
    this.dialogService.create({
      zTitle: 'Create a Game',
      zDescription: 'Define your game settings below:',
      zContent: DialogCreateGame,
      zOkText: 'Create Game',
      zOnOk: (instance) => {
        console.log('Game created:', instance.form.value);
      },
      zWidth: '450px',
    });
  }
}
