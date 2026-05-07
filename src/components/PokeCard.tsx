import "./PokeCard.css";
import { Link } from "react-router-dom";

type PokeCardProps = {
    imgUrl: string;
    detailPagePath: string;
    pokeId: string;
    pokeName: string;
    experience?: string;
    height?: string;
    weight?: string;
};

export default function PokeCard( props: PokeCardProps) {
    const formattedName = props.pokeName ? props.pokeName.charAt(0).toUpperCase() + props.pokeName.slice(1) : "";

    return (
        <Link to={props.detailPagePath}
                target="_blank"
                className="poke-card"
                aria-label={`View details of ${formattedName}`}
                title={`View details of ${formattedName}`}>
            <img src={props.imgUrl} alt={formattedName} width={200} />
            <span className="poke-card__name">{formattedName}</span>
            <span className="poke-card__info">
                <span className="poke-card__info__label">XP:</span>
                <span className="poke-card__info__xp">{props.experience}</span>
                &nbsp;- <span className="poke-card__info__label">W:</span>
                <span className="poke-card__info__weight">{props.weight}</span>
                &nbsp;- <span className="poke-card__info__label">H:</span>
                <span className="poke-card__info__height">{props.height}</span>
            </span>
        </Link>
    )
}
