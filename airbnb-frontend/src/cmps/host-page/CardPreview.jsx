export function CardPreview({ detail }) {
    return (

        <div className={`preview ${detail} flex column gap10`}>
            <div className="order-rate">
                {detail.rate}
            </div>
            <h1>{detail.price}</h1>
            <div className="order-status">
                <h1>Approved:{detail.status.Approved}</h1>
                <h1>Declined:{detail.status.Declined}</h1>
                <h1>Pending:{detail.status.Pending}</h1>
            </div>
        </div>

    )
}

