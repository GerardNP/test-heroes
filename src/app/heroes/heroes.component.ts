import { Component } from '@angular/core';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [HeroHeaderComponent, RouterOutlet],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export default class HeroesComponent { }
