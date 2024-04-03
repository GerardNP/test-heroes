import { Component, Input } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderService } from '../../../shared/services/header.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../interfaces/heroes';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
  selector: 'app-hero-managament',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './hero-managament.component.html',
  styleUrl: './hero-managament.component.scss'
})
export default class HeroManagamentComponent {

  @Input('id') heroId!: string;
  hero?: Hero;

  formHero: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    realName: this.fb.control('', Validators.required),
    creator: this.fb.control('', Validators.required),
    mainAbility: this.fb.control('', Validators.required),
    image: this.fb.control('', Validators.required),
  });
  imageHero: string = '';

  constructor(
    private heroesService: HeroesService,
    private fb: FormBuilder,
    private router: Router,
    private headerService: HeaderService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    if (this.heroId) {
      this.headerService.setTitle('Editar héroe');

      this.heroesService.getHero(parseInt(this.heroId)).subscribe({
        next: (hero) => {
          if (!hero) {
            this.notificationsService.show(`No existe un héroe con el id ${this.heroId}`);
            this.router.navigate(['heroes'])
            return;
          }

          this.hero = hero;
          this.setFormData(hero);
        }
      })
    }
    else {
      this.headerService.setTitle('Nuevo héroe');
    }

    this.handleForm()
  }

  private handleForm(): void {
    this.formHero.get('name')?.valueChanges.subscribe((value: string | null) => {
      if (value) {
        this.formHero.get('name')?.setValue(value.toUpperCase(), { emitEvent: false })
      }
    })
  }

  private setFormData(hero: Hero): void {
    this.formHero.get('name')?.setValue(hero.name?.toUpperCase());
    this.formHero.get('realName')?.setValue(hero.realName);
    this.formHero.get('creator')?.setValue(hero.creator);
    this.formHero.get('mainAbility')?.setValue(hero.mainAbility);
    this.formHero.get('image')?.setValue(hero.image);
    this.imageHero = hero.image
  }

  save(): void {
    this.formHero.markAllAsTouched();
    if (!this.formHero.valid) return;

    const hero: Hero = this.getFormData();
    if (!this.hero) {
      this.heroesService.createHero(hero).subscribe({
        next: () => {
          this.router.navigate(['heroes'])
        }
      });
    } else {
      this.heroesService.updateHero(hero).subscribe({
        next: () => {
          this.router.navigate(['heroes'])
        }
      });
    }
  }

  private getFormData(): Hero {
    const formValue = this.formHero.getRawValue();

    return {
      id: this.heroId ? parseInt(this.heroId) : undefined,
      name: formValue.name.trim().length ? formValue.name.trim().toUpperCase() : undefined,
      realName: formValue.realName.trim().length ? formValue.realName.trim() : undefined,
      creator: formValue.creator.trim().length ? formValue.creator.trim() : undefined,
      mainAbility: formValue.mainAbility.trim().length ? formValue.mainAbility.trim() : undefined,
      image: formValue.image.trim().length ? formValue.image.trim() : undefined,
    }
  }

}
