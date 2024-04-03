import { Hero, HeroDTO } from "./heroes";

export class HeroesMapper {

    static getHero(heroDTO: HeroDTO): Hero {
        return {
            id: heroDTO.heroId,
            name: heroDTO.heroName,
            realName: heroDTO.realName,
            mainAbility: heroDTO.primaryPower,
            creator: heroDTO.createdBy,
            image: heroDTO.imageURL
        };
    }

    static getHeroDTO(hero: Hero): HeroDTO {
        return {
            heroId: hero.id,
            heroName: hero.name,
            realName: hero.realName,
            primaryPower: hero.mainAbility,
            createdBy: hero.creator,
            imageURL: hero.image
        };
    }
}