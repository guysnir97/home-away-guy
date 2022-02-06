import { TripPreview } from "./TripPreview"

export function TripList({ orders, onSetOrder, onRemoveOrder }) {

    return (
        <ul className="trip-list">
            {orders.map((order, idx) => <TripPreview order={order} onSetOrder={onSetOrder} onRemoveOrder={onRemoveOrder} key={idx} />)}
        </ul>
    )

}