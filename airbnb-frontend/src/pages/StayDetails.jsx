import { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ShareSvg } from '../assets/img/stay-details/ShareSvg.jsx';
import { HeartSvg } from '../assets/img/stay-details/HeartSvg.jsx';
import { utilService } from '../services/util.service.js';
import { Tags } from '../cmps/stay-details/Tags.jsx';
import { OrderModal } from '../cmps/OrderModal.jsx';
import { stayService } from '../services/stay.service.js';
import { Amenities } from '../cmps/stay-details/amenities.jsx';
import { DatePicker } from '../cmps/header/DatePicker.jsx';
import { onAddOrder, onUpdateOrder, onSetOrder } from '../store/order.action';
import { ReviewPoints } from '../cmps/stay-details/ReviewPoints.jsx';
import { ReviewList } from '../cmps/stay-details/ReviewList.jsx';
import { MapDetails } from '../cmps/stay-details/MapDetails.jsx';
import { IdentityVerified } from '../cmps/svgs/IdentityVerified.jsx';
import { userService } from '../services/user.service.js';
import Loader from "react-loader-spinner";
import { SimpleSlider } from '../cmps/SliderImg.jsx';


class _StayDetails extends Component {

    state = {
        stay: null,
        host: null,
        reviews: 0,
        beds: 0,
        baths: 0,
        screenWidth: window.innerWidth
    };

    async componentDidMount() {

        window.addEventListener('resize', this.onResizeScreen)
        const reviews = utilService.getRandomIntInclusive(30, 500)
        const beds = utilService.getRandomIntInclusive(2, 6)
        const baths = utilService.getRandomIntInclusive(1, 5)

        await this.loadStay()
        const host = await userService.getById(this.state.stay.host)
        this.setState({ host, reviews, beds, baths })


    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeScreen)
    }
    onResizeScreen = ({ target }) => {
        this.setState(prevState => ({ ...prevState, screenWidth: target.innerWidth }));
    }



    loadStay = async () => {
        const id = this.props.match.params.stayId;
        const searchParams = new URLSearchParams(this.props.location.search);
        try {
            const stay = await stayService.getById(id)
            if (!this.props.currOrder) {
                const order = utilService.getQueryParams(searchParams)
                if (order.checkIn && order.checkOut) {
                    order.checkIn = new Date(+order.checkIn)
                    order.checkOut = new Date(+order.checkOut)
                }

                await this.props.onSetOrder(order)
            }
            this.setState({ stay })

        } catch (err) {
            this.props.history.push(`/stay?${searchParams}`)
        }

    }

    handlePickingDates = (start, end) => {
        const orderCopy = { ...this.props.currOrder }
        if (end) {
            orderCopy.checkOut = Date.parse(end)
        } else if (!orderCopy.checkOut) {
            orderCopy.checkOut = ''
        }
        orderCopy.checkIn = Date.parse(start)
        this.props.onUpdateOrder(orderCopy)
    }


    preventPropagation = event => {
        event.stopPropagation()
    }


    render() {
        const { stay, host, reviews, baths, beds, screenWidth } = this.state
        const { currOrder } = this.props
        if (!stay || !currOrder || !host) return (
            <div className="flex align-center justify-center full">
                <Loader
                    type="ThreeDots"
                    color='#FF385C'
                    height={100}
                    width={100}
                />
            </div>)
        return (
            <>
                <section className="stay-details-container ">
                    <h1 className=" fs28 fh32 medium fw-unset">{stay.name}</h1>
                    <div className="flex space-between column">
                        <div className="review-address-container flex ">
                            <div className="flex gap5 align-center nowrap">
                                {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                                <span className=" fs16 fh20 book fw-unset">{stay.rating}</span><span></span>
                                <span className=" fs16 fh20 book fw-unset">({reviews} reviews)</span> ·<span> </span>
                            </div>
                            <div className="fs16 fh20 book fw-unset">{stay.loc.address}</div>
                        </div>
                        <div className="flex justify-end gap20 margin-top20">
                            <span className="flex gap5"> <ShareSvg /><span className="details-save-share fw-unset fs16 fh18 medium">Share</span></span>
                            <span className="flex gap5"><HeartSvg className="heart-svg" /><span className="details-save-share fw-unset fs16 fh18 medium">Save</span></span>
                        </div>
                    </div>
                    {
                        screenWidth >= 750 &&
                        < div className="stay-details-grid ">{stay.imgUrls.slice(0, 5).map((img, idx) => {
                            return <div className={`grid-img${idx} pointer`} key={idx}><img className={`img${idx}`} src={img} alt="" /></div>
                        })}</div>
                    }
                    <div className="margin25">

                        {screenWidth < 750 && <SimpleSlider stay={stay} property='details' />}
                    </div>

                    <div className="details-main-container  flex space-between  ">
                        <div className="details-info flex column ">
                            <div className="flex space-between">
                                <div className=" flex column space-between">
                                    <h2>Entire {stay.type} hosted by {host.fullname}</h2>
                                    <div className="flex">{stay.capacity} guests · {stay.type} ·  {beds} beds · {baths} baths </div>
                                </div>
                                <div ><img className="user-profile-img" src={host.imgUrl} alt="" /></div>
                            </div>
                            <div className="seperation-line"></div>
                            <div className="tag-container flex column">
                                {stay.tags.map((tag, idx) => (
                                    <Tags key={idx} tag={tag} type={stay.type} />
                                ))}
                            </div>
                            <div className="seperation-line"></div>
                            <div className="description">{stay.description}</div>
                            <div className="seperation-line"></div>
                            <div className="amenities flex column">
                                <h2 className="middle-header">Amenities</h2>
                                <div className="amenities-container">
                                    {stay.amenities.map((amenity, idx) => {
                                        return <Amenities key={idx} amenity={amenity} />
                                    })}
                                </div>
                            </div>
                            <div className="seperation-line"></div>
                            <div >
                                <h2>Select check-in date</h2>
                                <p className="fade-font">Add your travel dates for exact pricing</p>
                                <div className="details-dates flex justify-center">
                                    <DatePicker order={currOrder} className={'datepicker-details'}
                                        preventPropagation={this.preventPropagation}
                                        handlePickingDates={this.handlePickingDates} />
                                </div>
                            </div>
                        </div >
                        <OrderModal stay={stay} order={currOrder} />
                    </div >
                    <div className="seperation-line"></div>
                    <div className="details-reviews-header medium fh26 flex gap5">
                        {<FontAwesomeIcon className="star-icon" icon={faStar} />}
                        {stay.rating}
                        <span>·</span>{utilService.getRandomIntInclusive(30, 500)} reviews
                    </div>
                    <ReviewPoints reviews={stay.reviews} />
                    <ReviewList reviews={stay.reviews} />

                    <div className="seperation-line"></div>
                    <h2>Where you'll be</h2>
                    <p>{stay.loc.address}</p>
                    <div className="map-container relative">
                        <MapDetails lat={stay.loc.lat} lng={stay.loc.lng} />
                    </div>
                    <div className="seperation-line"></div>
                    <div className="user-header flex  gap10">
                        <img className="user-details-profile-img" src={host.imgUrl} alt="" />
                        <div className="user-profile-name-date flex column">
                            <span className="user-name medium fs22 fh26">Hosted by {host.fullname}</span>
                            <span className="fs14 fh18 book clr1">{host.joinDate || 'joined in September 2016'}</span>
                        </div>
                    </div>

                    <div className="flex gap10">
                        <div className="fs22 flex gap5">
                            {<FontAwesomeIcon className="star-icon fs16 fh20" icon={faStar} />}
                            <div className="fs16 fh20 book">{utilService.getRandomIntInclusive(100, 2000).toLocaleString('en-IL')} Reviews</div>
                        </div>
                        <div className=" flex gap10">
                            {<IdentityVerified className="clr3" />}
                            <div className="fs16 fh20 book">Identity verified</div>
                        </div>
                    </div>
                    <div className=" respond-container">
                        <p className="fs16 fh20 book">Response rate: 99%</p>
                        <p className="fs16 fh20 book">Response time: within an hour</p>
                    </div>
                    <button className="contact-host fs16 fh20 medium">Contact host</button>
                </section >
            </>
        )
    }
}


function mapStateToProps({ stayReducer, orderReducer }) {
    return {
        stays: stayReducer.stays,
        currOrder: orderReducer.currOrder
    }
}
const mapDispatchToProps = {
    onAddOrder,
    onUpdateOrder,
    onSetOrder
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)