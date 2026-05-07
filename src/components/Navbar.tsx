import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import "./Navbar.css";
import { Link, useMatch } from "react-router-dom";
import type { OptionType, Pokemon } from "../interfaces";
import SearchSortFilter from "./SearchSortFilter";

interface NavbarProps {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
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



export default function Navbar(props: NavbarProps) {
    const isPokemonListPage = useMatch('/pokemon-list');

    useEffect(() => {
        console.log('rendering nav bar');
    },[]);
    function toggleTheme(prevTheme: string) {
        if (prevTheme === "light") {
            // change theme in localStorage
            localStorage.setItem('theme', 'dark');
            return "dark";
        } else {
            // change theme in localStorage
            localStorage.setItem('theme', 'light');
            return "light";
        }
    }
    const { theme, setTheme, pokeList, searchStr, setSearchStr, setActivePage, abilityFilter, setAbilityFilter, typeFilter, setTypeFilter, sortType, setSortType, nameSort, setNameSort, xpSort, setXpSort, heightSort, setHeightSort, weightSort, setWeightSort, abilityFilters, typeFilters } = props;

    return (
        <div className="navbar">
            <span className="navbar--left">
            <Link to="/" className="navbar--logo"><img src={`${import.meta.env.BASE_URL}main-logo.webp`} alt="Pikachu" width="70px"/></Link>
            </span>
            <span className="navbar--right">
            {isPokemonListPage &&
            <SearchSortFilter {...{pokeList, searchStr, setSearchStr, setActivePage, abilityFilter, setAbilityFilter, typeFilter, setTypeFilter, sortType, setSortType, nameSort, setNameSort, xpSort, setXpSort, heightSort, setHeightSort, weightSort, setWeightSort, abilityFilters, typeFilters}}/>}

            <Link to="/pokemon-list" >Pokemon List</Link>
            <Link to="/my-account" >My Account</Link>
            <button onClick={() => setTheme(toggleTheme(theme))}>{theme} theme</button>
            </span>
        </div>
    )
}