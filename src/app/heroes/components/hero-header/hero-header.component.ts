import { Component } from '@angular/core';
import { HeaderService } from '../../../shared/services/header.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-hero-header',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, CommonModule],
  templateUrl: './hero-header.component.html',
  styleUrl: './hero-header.component.scss'
})
export class HeroHeaderComponent {

  title: string = '';
  isMainPage: boolean = false;

  constructor(
    private headerService: HeaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isMainPage = this.checkIsMainPage(this.router.url);

    this.headerService.title$.subscribe(title => {
      this.title = title;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: (res) => {
        const event = res as NavigationEnd;
        this.isMainPage = this.checkIsMainPage(event.urlAfterRedirects);
      }
    })
  }


  private checkIsMainPage(route: string): boolean {
    return route === '/heroes';
  }

}
