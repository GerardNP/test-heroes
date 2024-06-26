import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../../../shared/services/header.service';
import HeroCardComponent from '../../components/hero-card/hero-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../interfaces/heroes';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule,
    HeroCardComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export default class HeroesListComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  showHeroes: boolean = false;
  errors: boolean = false;
  heroesList: Hero[] = [];
  allHeroesList: Hero[] = [];

  searchField: FormControl = this.fb.control('');

  constructor(
    private heroesService: HeroesService,
    private fb: FormBuilder,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.setTitle('Consulta de héroes');

    this.getHeroes();
    this.handleForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // #region FILTER AND SEARCH
  getHeroes(): void {
    this.showHeroes = false;
    this.errors = false;

    this.heroesService.getHeroes().subscribe({
      next: (heroes => {
        this.allHeroesList = heroes;
        this.heroesList = heroes

        setTimeout(() => {
          this.showHeroes = true;
        }, 500); // Solo para que el spinner sea visible
      }),
      error: () => {
        this.errors = false;
      }
    })
  }

  private handleForm(): void {
    this.searchField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: (value) => {
        this.filterHeroesByName(value);
      }
    })
  }

  private filterHeroesByName(value: string): void {
    if (!value.trim().length) {
      this.heroesList = this.allHeroesList;
    }

    this.heroesList = this.allHeroesList.filter(hero => hero.name.toLowerCase().includes(value.toLowerCase()))
  }
  // #endregion

}
