import { Link } from "react-router-dom";
import { SimpleSlider } from "./SliderImg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from "../services/util.service";


export function StayPreview({ stay, orderParams, idx }) {
    const queryString = utilService.makeQueryParams(orderParams)
    return (
        <Link className="link-detail" to={`/stay/${stay._id}?${queryString}`}>
            <div className="stay-container">
                <SimpleSlider stay={stay} property='preview' />
                <div className="flex column mrt10">
                    <div className="flex space-between">
                        <h2 className="fs14 fh18 airbnb-book fw-unset mrb2"> {<FontAwesomeIcon className='star-icon clr3' icon={faStar} />} <span className="clr2">{stay.rating}</span>
                            <span className="clr1">({utilService.getRandomIntInclusive(30, 400)})</span></h2>
                        <h2 className="fs16 fh20 clr2 airbnb-book fw-unset "><span className="airbnb-bold ">${stay.price}</span> / night</h2>
                    </div>
                    <h2 className="fs16 fh20 clr2 airbnb-book fw-unset mrb2">{stay.type} • {stay.loc.address.split(',')[0]}</h2>
                    <h2 className="clr2 fs16 fh20 airbnb-book fw-unset mrb2">{stay.name}</h2>
                </div>
            </div>
        </Link >
    )
}


