export interface HeroDTO {
    heroId?: number;
    heroName: string;
    realName: string;
    primaryPower: string;
    createdBy: string;
    imageURL: string;
}


export interface Hero {
    id?: number;
    name: string;
    realName: string;
    mainAbility: string;
    creator: string;
    image: string;
}