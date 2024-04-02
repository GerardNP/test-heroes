import { Observable, filter, map, of } from "rxjs";
import { RequestService } from "../../shared/services/request.service";
import { environment } from "../../../environments/environment";
import { Hero, HeroDTO } from "../../interfaces/heroes/heroes";
import { HeroesMapper } from '../../interfaces/heroes/heroes.mapper';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HeroesService {

    constructor(private request: RequestService) { }

    getHeroes(): Observable<Hero[]> {
        const useMock: boolean = environment.useMock ?? false;
        return this.request.get<HeroDTO[]>('', '', useMock, 'heroes/heroes-list.json')
            .pipe(
                map(dtos => {
                    return dtos.map(dto => HeroesMapper.getHero(dto))
                })
            )
    }

    getHero(idHero: number): Observable<Hero | undefined> {
        const useMock: boolean = environment.useMock ?? false;

        let request$: Observable<Hero | undefined>;
        if (useMock) {
            request$ = this.getHeroes().pipe(
                map(heroes => heroes.find(hero => hero.id === idHero))
            );
        } else {
            request$ = this.request.get<HeroDTO>('', { id: idHero.toString() }).pipe(
                map(dto => dto ? HeroesMapper.getHero(dto) : undefined)
            );
        }

        return request$;
    }

    createHero(hero: Hero): Observable<Hero> {
        const useMock: boolean = environment.useMock ?? false;

        if (useMock) {
            hero.id = 1;
            return of(hero);
        } else {
            return this.request.post<HeroDTO>('', HeroesMapper.getHeroDTO(hero)).pipe(
                map(dto => HeroesMapper.getHero(dto))
            )
        }
    }

    updateHero(hero: Hero): Observable<Hero> {
        const useMock: boolean = environment.useMock ?? false;

        if (useMock) {
            hero.id = 1;
            return of(hero);
        } else {
            return this.request.put<HeroDTO>('', HeroesMapper.getHeroDTO(hero)).pipe(
                map(dto => HeroesMapper.getHero(dto))
            )
        }
    }

    deleteHero(idHero: number): Observable<boolean> {
        const useMock: boolean = environment.useMock ?? false;
        if (useMock) {
            return of(true);
        } else {
            return this.request.delete('', { id: idHero });
        }
    }
}