import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { utilService } from '../services/util.service.js';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export class ReserveModal extends React.Component {

    state = {
        date: '',
        Guests: {
            childern: '',
            adults: ''
        }


    }

    render() {
        const { stay } = this.props
        return <div className="reserve-modal flex column ">
            <div className="reserve-info flex space-between ">
                <h3 className="info-price">price:{stay.price}</h3>
                <h3 className="info-review">reviews:
                    {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                    {stay.rating}
                    ({utilService.getRandomIntInclusive(30, 500)} reviews) ·<span> </span></h3>
                {/* <GuestsPicking /> */}
            </div>
        </div>
    }

}
