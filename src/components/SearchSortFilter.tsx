import "./SearchSortFilter.css";
import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from "react";
import Dropdown from "./Dropdown";
import type { OptionType, Pokemon } from "../interfaces";

interface SearchSortFilterProps {
    pokeList: Pokemon[];
    searchStr: string;
    setSearchStr: Dispatch<SetStateAction<string>>;
    setActivePage: Dispatch<SetStateAction<number>>;
    abilityFilter: string;
    setAbilityFilter: Dispatch<SetStateAction<string>>;
    typeFilter: string;
    setTypeFilter: Dispatch<SetStateAction<string>>;
    sortType: "none" | "name" | "xp" | "weight" | "height";
    setSortType: Dispatch<SetStateAction<"none" | "name" | "xp" | "weight" | "height">>;
    nameSort: "none" | "asc" | "desc";
    setNameSort: Dispatch<SetStateAction<"none" | "asc" | "desc">>;
    xpSort: "none" | "asc" | "desc";
    setXpSort: Dispatch<SetStateAction<"none" | "asc" | "desc">>;
    heightSort: "none" | "asc" | "desc";
    setHeightSort: Dispatch<SetStateAction<"none" | "asc" | "desc">>;
    weightSort: "none" | "asc" | "desc";
    setWeightSort: Dispatch<SetStateAction<"none" | "asc" | "desc">>;
    abilityFilters: OptionType[];
    typeFilters: OptionType[];
}

export default function SearchSortFilter( props: SearchSortFilterProps ) {
    const {searchStr, setSearchStr, setActivePage, abilityFilter, setAbilityFilter, typeFilter, setTypeFilter, sortType, setSortType, nameSort, setNameSort, xpSort, setXpSort, heightSort, setHeightSort, weightSort, setWeightSort, abilityFilters, typeFilters} = props;

    const handleSearch = useCallback((val: string) => {
        localStorage.setItem('searchStr', val);
        setSearchStr(val);
        setActivePage(1);
        localStorage.setItem('activePage', "1");
    },[setSearchStr, setActivePage])
    
    const handleAbilityFilterChange = useCallback((val: string) => {
        localStorage.setItem('abilityFilter', val);
        setAbilityFilter(val);
        // console.log('val:', val);
        setActivePage(1);
        localStorage.setItem('activePage', "1");
    },[setAbilityFilter, setActivePage])
    
    const handleTypeFilterChange = useCallback((val: string) => {
        localStorage.setItem('typeFilter', val);
        setTypeFilter(val);
        // console.log('val:', val);
        setActivePage(1);
        localStorage.setItem('activePage', "1");
    },[setTypeFilter, setActivePage])

    const processNewSort = useCallback((oldSort: string, sortType: "none" | "name" | "xp" | "weight" | "height") => {
        localStorage.setItem('sortType', sortType);
        setSortType(sortType);
        let newSort: "none" | "asc" | "desc" = "asc";
        if (oldSort === "asc") {
            newSort = "desc";
        } else if (oldSort === "desc") {
            newSort = 'none';
        } else if (oldSort === "none") {
            newSort = "asc";
        }
        return newSort;
    },[setSortType])

    const handleNameSort = () => {
        const newSort = processNewSort(props.nameSort, 'name');
        setNameSort(newSort);
        localStorage.setItem('nameSort', newSort);
    }

    const handleXpSort = () => {
        const newSort = processNewSort(props.xpSort, 'xp');
        setXpSort(newSort);
        localStorage.setItem('xpSort', newSort);
    }

    const handleWeightSort = () => {
        const newSort = processNewSort(props.weightSort, 'weight');
        setWeightSort(newSort);
        localStorage.setItem('weightSort', newSort);
    }

    const handleHeightSort = () => {
        const newSort = processNewSort(props.heightSort, 'height');
        setHeightSort(newSort);
        localStorage.setItem('heightSort', newSort);
    }

    const sortIndicator = useCallback((sortDirection: string, type: string) => {
        let className = `sort-direction ${type}`;
        if (type !== sortType) {
            className += " inactive";
        }
        const classNameNone = " none";
        const upArrow = <span className={className}>&#8593;</span>;
        const downArrow = <span className={className}>&#8595;</span>
        if (type !== "name") {
            if (sortDirection === "asc") {
                return upArrow;
            } else if (sortDirection === "desc") {
                return downArrow;
            } else if (sortDirection === "none") {
                className += classNameNone;
                return <span className={className}>&#8593;</span>;
            }
        } else if (type === "name") {
            if (sortDirection === "asc") {
                return <span className={className}>(a-z)</span>;
            } else if (sortDirection === "desc") {
                return <span className={className}>(z-a)</span>;
            } else if (sortDirection === "none") {
                className += classNameNone;
                return <span className={className}>(a-z)</span>;
            }
        }
    },[sortType]);

    return  (
        <span className="search-sort-filter--wrap">
            <div className="search-sort-filter--dropdown">
                <div className="search--outer-wrap">
                    <span className="filter-label">Search: </span>
                    <span className="search--wrap">
                        <input id="pokemon-search-input" type="text" onChange={((e) => handleSearch(e.target.value))} value={searchStr}/>
                        <button
                            className={`search--close ${searchStr.length > 0 ? "" : "hide"}`}
                            aria-label="Clear search"
                            title="Clear search"
                            onClick={() => handleSearch("")}
                            >
                            <span className="first"></span>
                            <span className="second"></span>
                        </button>
                    </span>

                </div>
                {abilityFilters.length && (
                    <div className="filter--wrap">
                        <span className="filter-label">Ability filter: </span>
                        <Dropdown id="ability-filter" items={abilityFilters} onChangeHandle={handleAbilityFilterChange} value={abilityFilter}/>
                    </div>
                )}
                {typeFilters.length && (
                    <div className="filter--wrap">
                        <span className="filter-label">Type filter: </span>
                        <Dropdown id="type-filter" items={typeFilters} onChangeHandle={handleTypeFilterChange} value={typeFilter}/>
                    </div>
                )}
                <div className="sort--wrap">
                    <span className="filter-label">Sort: </span>
                    <button onClick={() => handleNameSort()}>
                        <span className="sort-cta name">Name</span>
                        {sortIndicator(nameSort, "name")}
                    </button>
                    <button onClick={() => handleXpSort()}>
                        <span className="sort-cta">XP</span>
                        {sortIndicator(xpSort, "xp")}
                    </button>
                    <button onClick={() => handleHeightSort()}>
                        <span className="sort-cta">Height</span>{sortIndicator(heightSort, "height")}
                    </button>
                    <button onClick={() => handleWeightSort()}>
                        <span className="sort-cta">Weight</span>
                        {sortIndicator(weightSort, "weight")}
                    </button>
                </div>
            </div>
        </span>
    )
}