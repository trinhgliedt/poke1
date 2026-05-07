import "./PokemonList.css";
import { useEffect, useMemo } from "react";
import type { Ability, Type, ListProps, Pokemon } from "../interfaces";
import Paginations from "../components/Paginations";
import PokeCard from "../components/PokeCard";


export default function PokemonList( props: ListProps) {
    const { pokeList, loading, allPokemonDetailsLoaded, itemsPerPage, searchStr, activePage, setActivePage, abilityFilter, typeFilter, setAbilityFilters, setTypeFilters, sortType, nameSort, xpSort, heightSort, weightSort } = props;

    useEffect(() => {
        console.log('rendering poke list');
    },[]);

    function extractId(pokeURL: string) {
        const urlParts = pokeURL.split("/");
        const pokeId = urlParts[urlParts.length - 2];
        return pokeId;
    }
    function constructImageURL(pokeURL: string) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractId(pokeURL)}.png`;
    }
    function constructSinglePokePagePath(pokeURL: string) {
        return `/pokemon/${extractId(pokeURL)}`;
    }

    const filteredPokeList = useMemo(() => {
        const q = searchStr.trim().toLowerCase();
        if (!allPokemonDetailsLoaded) return pokeList;

        const resultAfterSearch = q ? pokeList.filter((pokemon) => pokemon.name.toLowerCase().includes(q)) : pokeList;

        const resultAfterSearchAndAbilityFilter = abilityFilter ? resultAfterSearch.filter(
            (poke) => poke.detail?.abilities?.some((a: Ability) => a.ability.name === abilityFilter)
        )
        : resultAfterSearch;

        const resultAfterSearchAndTypeFilter = typeFilter ? resultAfterSearch.filter(
            (poke) => poke.detail?.types.some((t: Type) => t.type.name === typeFilter)) : resultAfterSearch;

        const resultAfterSearchAbilityAndTypeFilter = typeFilter ? resultAfterSearchAndAbilityFilter.filter(
            (poke) => poke.detail?.types.some((t: Type) => t.type.name === typeFilter)) : resultAfterSearchAndAbilityFilter;


        const defaultFilter = { val: "", text: "Select one"};

        function createFilterOptions(baseList: Pokemon[], type: "ability" | "type") {
            const optionSet = new Set<string>();
            for (const poke of baseList) {
                if (type === "ability") {
                    for (const ability of poke.detail?.abilities ?? []) {
                        optionSet.add(ability.ability.name);
                    }
                } else if (type === "type") {
                    for (const type of poke.detail?.types ?? []) {
                        optionSet.add(type.type.name);
                    }
                }
            }
            const sortedList = [...optionSet].sort();
            const sortedOptionsForDropdown = sortedList.map((item: string) => {
                return { val: item, text: item};
            })
            return [defaultFilter, ...sortedOptionsForDropdown];
        }

        setAbilityFilters(createFilterOptions(resultAfterSearchAndTypeFilter, "ability"));
        setTypeFilters(createFilterOptions(resultAfterSearchAndAbilityFilter, "type"));

        console.log('sortType: ', sortType);

        function sort() {
            if (sortType === "name") {
                if (nameSort === 'asc') {
                    return [...resultAfterSearchAbilityAndTypeFilter].sort((a, b) => a.name.localeCompare(b.name));
                } else if (nameSort === 'desc') {
                    return [...resultAfterSearchAbilityAndTypeFilter].sort((a, b) => b.name.localeCompare(a.name));
                } else {
                    return resultAfterSearchAbilityAndTypeFilter;
                }
            }

            if (sortType === "xp") {
                const resultWithXP = [...resultAfterSearchAbilityAndTypeFilter].filter((poke) => poke.detail?.base_experience);
                if (xpSort === 'asc') {
                    return resultWithXP .sort((a, b) => Number(a.detail?.base_experience) - Number(b.detail?.base_experience));
                } else if (xpSort === 'desc') {
                    return resultWithXP .sort((a, b) => Number(b.detail?.base_experience) - Number(a.detail?.base_experience));
                } else {
                    return resultAfterSearchAbilityAndTypeFilter;
                }
            }

            if (sortType === "weight") {
                if (weightSort === 'asc') {
                    return [...resultAfterSearchAbilityAndTypeFilter].sort((a, b) => Number(a.detail?.weight) - Number(b.detail?.weight));
                } else if (weightSort === 'desc') {
                    return [...resultAfterSearchAbilityAndTypeFilter].sort((a, b) => Number(b.detail?.weight) - Number(a.detail?.weight));
                } else {
                    return resultAfterSearchAbilityAndTypeFilter;
                }
            }

            if (sortType === "height") {
                if (heightSort === 'asc') {
                    return [...resultAfterSearchAbilityAndTypeFilter].sort((a, b) => Number(a.detail?.height) - Number(b.detail?.height));
                } else if (heightSort === 'desc') {
                    return [...resultAfterSearchAbilityAndTypeFilter].sort((a, b) => Number(b.detail?.height) - Number(a.detail?.height));
                } else {
                    return resultAfterSearchAbilityAndTypeFilter;
                }
            }

            return resultAfterSearchAbilityAndTypeFilter;

        }

        // console.log("filtering pokelist: activePage: ", activePage, ", result:", result);
        return sort();
    },[allPokemonDetailsLoaded, pokeList, searchStr, abilityFilter, typeFilter, setAbilityFilters, setTypeFilters, sortType, nameSort, xpSort, weightSort, heightSort]);


    const pagedPokemons = useMemo(() => {
        const pages: Pokemon[][] = [];
        for (let i = 0; i < filteredPokeList.length; i += itemsPerPage) {
            pages.push(filteredPokeList.slice(i, i + itemsPerPage))
        }
        return pages;
    }, [filteredPokeList, itemsPerPage])

    if (loading) return "Loading...";

    return (
        <div className="poke-list">
            {filteredPokeList.length === 0 &&
                <p style={{marginTop: '40px'}}>No match found!</p>
            }
            {pagedPokemons.map((page, p) => (
                <div className={`poke-list-page ${p+1} ${activePage === p+1 ? "active" : ""}`} key={p+1}>
                    {page.map((pokemon) => {
                        const imgUrl = constructImageURL(pokemon.url);
                        const detailPagePath = constructSinglePokePagePath(pokemon.url);
                        const pokeId = extractId(pokemon.url);
                        const pokeName = pokemon.name;
                        const experience = pokemon.detail?.base_experience;
                        const height = pokemon.detail?.height;
                        const weight = pokemon.detail?.weight;
                        return (
                            <PokeCard key={pokeId} {...{imgUrl, detailPagePath, pokeId, pokeName, experience, height, weight}} />
                        );
                    })}
                </div>
            ))}
            <Paginations totalPages={pagedPokemons.length}
                        activePage={activePage}
                        setActivePage={setActivePage} />
        </div>
    )
}

