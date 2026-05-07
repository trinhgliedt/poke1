import type { Dispatch, SetStateAction } from "react";

export interface ListProps {
    pokeList: Pokemon[];
    loading: boolean;
    allPokemonDetailsLoaded: boolean;
    itemsPerPage: number;
    searchStr: string;
    activePage: number;
    setActivePage: Dispatch<SetStateAction<number>>;
    abilityFilter: string;
    typeFilter: string;
    setAbilityFilters: Dispatch<SetStateAction<OptionType[]>>;
    setTypeFilters: Dispatch<SetStateAction<OptionType[]>>;
    sortType: "none" | "name" | "xp" | "weight" | "height";
    nameSort: "none" | "asc" | "desc";
    xpSort: "none" | "asc" | "desc";
    heightSort: "none" | "asc" | "desc";
    weightSort: "none" | "asc" | "desc";
}

export interface Pokemon {
    name: string;
    url: string;
    detail?: PokemonDetailType;
}

export interface PokemonDetailType {
    name: string;
    height: string;
    weight: string;
    base_experience: string;
    abilities?: Ability[];
    types: Type[];
}

export interface AbilityItem {
    name: string;
    url: string;
    effect?: AbilityEnEffect;
    pokemon?: string[];
}

export interface Ability {
    ability: {
         name: string;
         url: string;
         desc?: string;
    };
}
export interface Type {
    type: TypeItem;
}

export interface TypeItem {
    name: string;
    url: string;
}


export interface AbilityEffect {
    effect: string;
    language: {
        name: string;
    };
    short_effect: string;
}

export interface AbilityEnEffect {
    effect: string;
    short_effect: string;
}

export type AbilityMap = Record<
    string,
    {
        url: string;
        effect: AbilityEffectInfo;
        pokemon: string[];
    }
>;

export type AbilityEffectInfo =  {
    effect: string;
    short_effect: string;
}

export type OptionType = {
    val: string;
    text: string;
}
