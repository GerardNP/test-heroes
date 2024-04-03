import { Observable, map, of } from "rxjs";
import { RequestService } from "../../shared/services/request.service";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { Hero, HeroDTO } from "../interfaces/heroes";
import { HeroesMapper } from "../interfaces/heroes.mapper";
import { CreateUpdateResponse, DeleteResponse } from "../../shared/interfaces/responses";

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

        return this.request.get<HeroDTO>('', { id: idHero.toString() }, useMock, 'heroes/get-hero.json').pipe(
            map(dto => dto ? HeroesMapper.getHero(dto) : undefined
            )
        );

    }

    createHero(hero: Hero): Observable<Hero | undefined> {
        const useMock: boolean = environment.useMock ?? false;

        return this.request.post<CreateUpdateResponse<HeroDTO>>('', HeroesMapper.getHeroDTO(hero), useMock, 'heroes/post-hero.json').pipe(
            map(res => res ? HeroesMapper.getHero(res.body) : undefined)
        )
    }

    updateHero(hero: Hero): Observable<Hero | undefined> {
        const useMock: boolean = environment.useMock ?? false;

        return this.request.put<CreateUpdateResponse<HeroDTO>>('', HeroesMapper.getHeroDTO(hero), useMock, 'heroes/put-hero.json').pipe(
            map(res => res ? HeroesMapper.getHero(res.body) : undefined)
        )

    }

    deleteHero(idHero: number): Observable<DeleteResponse> {
        const useMock: boolean = environment.useMock ?? false;

        return this.request.delete<DeleteResponse>('', { id: idHero }, useMock, 'heroes/delete-hero.json');
    }
}