import "./Paginations.css";
import type { Dispatch, SetStateAction } from "react";

type PaginationsProps = {
    totalPages: number;
    activePage: number;
    setActivePage: Dispatch<SetStateAction<number>>;
};


export default function Paginations(props: PaginationsProps) {

    function handleClick(pageNumber: number) {
        if (props.activePage !== pageNumber) {
            props.setActivePage(pageNumber);
            localStorage.setItem('activePage', pageNumber.toString());
        }
    }

    const spanGroup = Array.from({ length: props.totalPages }, (_, p) => 
        <button  className={`pagination-item ${p+1} ${props.activePage === p + 1 ? "active" : ""}`}
                key={p+1}
                onClick={() => handleClick(p+1)}
        >
        {p + 1}
        </button>);

return (
        <div className="pagination-wrapper">
            {spanGroup}
        </div>
    )
}