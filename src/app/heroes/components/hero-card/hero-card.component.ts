import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogInformationComponent } from '../../../shared/components/dialog-information/dialog-information.component';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Hero } from '../../interfaces/heroes';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [
    MatCardModule,
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    CapitalizePipe
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export default class HeroCardComponent {

  @Input() hero!: Hero;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  // #region ACTIONS HERO
  deleteHero(hero: Hero) {
    this.dialog
      .open(DialogInformationComponent, {
        data: {
          content: `¿Desea eliminar el héroe <span class="font-bold">${hero.name}</span>?`,
          title: 'Información',
          firstButton: 'Cancelar',
          secondButton: 'Eliminar'
        }
      })
      .afterClosed()
      .subscribe(confirm => {
        if (!confirm) return;

        this.heroesService.deleteHero(hero.id!).subscribe({
          next: () => {
            this.refresh.emit();
          }
        });
      });
  }

  editHero(hero: Hero) {
    this.router.navigate(['heroes', 'editar-heroe', hero.id])
  }
  // #endregion
}
