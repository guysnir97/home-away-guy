export function FinalPrice({ order, stay }) {


    return (
        <div className="final-price-container flex column">
            <p className="final-price-header">You won't be charged yet</p>
            <div className="flex space-between">
                <span className="pricing fs16 fh36 book">${stay.price}X{(order.checkOut - order.checkIn) / (1000 * 60 * 60 * 24)} nights</span>
                <span className="fs16 fh36 book">${(((order.checkOut - order.checkIn) / (1000 * 60 * 60 * 24)) * stay.price).toLocaleString('en-IL')}</span>
            </div>
            <div className="flex space-between">
                <span className="pricing fs16 fh36 book">Cleaning Fee</span>
                <span className="fs16 fh36 book">$43</span>
            </div>
            <div className="flex space-between">
                <span className="pricing fs16 fh36 book">Service Fee</span>
                <span className="fs16 fh36 book">$75</span>
            </div>
            <div className="seperation-line"></div>
            <div className="flex space-between">
                <span className=" fs16 fh36 medium">Total</span>
                <span className=" fs16 fh36 medium">${(((order.checkOut - order.checkIn) / (1000 * 60 * 60 * 24)) * stay.price + 118).toLocaleString('en-IL')}</span>
            </div>
        </div>
    )
}