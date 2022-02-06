import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDollarSign, faInfo, faHome } from '@fortawesome/free-solid-svg-icons';

export function HostStatus({ price, rate, status, activeGuests, screenWidth }) {
    return (
        <div className="cards-container flex space-between ">
            <div className="card-container guests round-edge">
                <div className=" high flex column space-between " >
                    <div className="space-between column">
                        <h1 className="wide book flex fw-unset clr1 justify-end txt">Active Guests</h1>
                    </div>
                    <div className="img-guest-container relative flex justify-end">
                        <span className="active-guests fs32 card-num">{activeGuests}</span>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center guests">
                    <FontAwesomeIcon className="icon" icon={faHome} />
                </div>
            </div>
            <div className="card-container star round-edge">
                <div className=" high flex column space-between " >
                    <div className="space-between column">
                        <h1 className="wide book flex fw-unset clr1 justify-end ">Avg Rate</h1>
                    </div>
                    <div className="img-guest-container relative flex justify-end">
                        <span className="active-star fs32 card-num">{+rate || 0}</span>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center star">
                    <FontAwesomeIcon className="icon" icon={faStar} />
                </div>
            </div>
            <div className="card-container star round-edge">
                <div className=" high flex column space-between " >
                    <div className="space-between column ">
                        <h1 className="wide book flex fw-unset clr1 justify-end txt">Month Revenue</h1>

                    </div>
                    <div className="img-guest-container relative flex justify-end">
                        <span className="active-star fs32 card-num">${price.toLocaleString('en-IL')}</span>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center dollar">
                    <FontAwesomeIcon className="icon" icon={faDollarSign} />
                </div>
            </div>
            <div className="card-container status round-edge">
                <div className="flex high column space-between" >
                    <div className="flex space-between column">
                        <h1 className="wide book flex justify-end fw-unset clr1 ">Status</h1>
                    </div>
                    <div className="status-info flex space-between gap5">
                        <div className="flex align-center bcg green ">
                            <h3 className="fs14"> {screenWidth > 460 && <span>Approved</span>} {status.Approved}</h3>
                        </div>
                        <div className="flex align-center bcg yellow">
                            <h3 className="fs14">{screenWidth > 460 && <span>Pending</span>} {status.Pending}</h3>
                        </div>
                        <div className="flex align-center bcg red">
                            <h3 className="fs14">{screenWidth > 460 && <span>Declined</span>} {status.Declined}</h3>
                        </div>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center info">
                    <FontAwesomeIcon className="icon" icon={faInfo} />
                </div>
            </div>

        </div >

    )

}