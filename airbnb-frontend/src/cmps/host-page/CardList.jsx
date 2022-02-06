import { CardPreview } from "./CardPreview"
export function CardList({ hostDetails }) {

    return (
        <ul className="card-list flex gap10">
            {hostDetails.map((detail, idx) => <CardPreview detail={detail} key={idx} />)}
        </ul>
    )

}