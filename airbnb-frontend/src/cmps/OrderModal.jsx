import React from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';
import { DatePicker } from './header/DatePicker';
import { withRouter } from 'react-router';
import { onAddOrder, onUpdateOrder, onSetOrder } from '../store/order.action';
import { onSetMsg } from '../store/user.action'
import { socketService } from '../services/socket.service';
import { FinalPrice } from './FinalPrice';
import Loader from "react-loader-spinner";
import { UserMsg } from './UserMsg';


export class _OrderModal extends React.Component {

    state = {
        isReserve: false,
        isFinalReserve: false,
        isPickingGuests: false,
        isPickingDates: false,
        reviewsNumber: 0,
        orderParams: null,

    }

    async componentDidMount() {
        let { reviewsNumber } = this.state
        reviewsNumber = utilService.getRandomIntInclusive(30, 500)
        window.addEventListener('click', this.closeInputs)
        this.setState({ reviewsNumber })

    }

    inputRef = React.createRef(null)

    componentWillUnmount() {
        window.removeEventListener('click', this.closeInputs)
    }

    onSetColor = (ev) => {
        let x = ev.clientX
        let y = ev.clientY
        this.inputRef.current.style.setProperty('--mouse-x', x)
        this.inputRef.current.style.setProperty('--mouse-y', y)
    }

    closeInputs = () => {
        let { isPickingGuests, isPickingDates } = this.state
        if (!isPickingGuests && !isPickingDates) return
        isPickingGuests = false
        isPickingDates = false
        this.setState(prevState => ({ ...prevState, isPickingGuests, isPickingDates }))
    }

    activeInput = (input) => {
        this.closeInputs()
        switch (input) {
            case 'guest':
                this.setState({ isPickingGuests: true, isReserve: false })
                break;
            case 'date':
                this.setState({ isPickingDates: true, isReserve: false })
                break;
            default:
        }
    }

    preventPropagation = ev => {
        ev.stopPropagation()
    }

    getTotalGuests = () => {
        if (this.props.currOrder.guests) {
            let { adult, child, infant } = this.props.currOrder.guests
            var guests = `Guests: ${adult + child + infant}`
            return guests
        } else {
            return 0
        }
    }

    handleGuestsChanege = (field, value) => {
        const orderCopy = { ...this.props.currOrder }
        if (!orderCopy.guests) {
            orderCopy.guests = {
                adult: 0,
                child: 0,
                infant: 0
            }
        }
        orderCopy.guests[field] = value
        this.props.onUpdateOrder(orderCopy)
    }

    handlePickingDates = (start, end) => {
        const orderCopy = { ...this.props.currOrder }
        orderCopy.checkIn = Date.parse(start)
        if (end) {
            orderCopy.checkOut = Date.parse(end)
        }
        this.props.onUpdateOrder(orderCopy)
    }


    createFinalOrder = () => {
        const { currOrder, stay, user } = this.props
        const finalOrder = {
            _id: currOrder._id || null,
            host: stay.host,
            createdAt: Date.now(),
            price: ((currOrder.checkOut - currOrder.checkIn) / (1000 * 60 * 60 * 24)) * stay.price + 118,
            checkIn: currOrder.checkIn,
            checkOut: currOrder.checkOut,
            guests: currOrder.guests,
            img: stay.imgUrls[0],
            status: 'Pending',
            buyer: {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl
            },
            stay: {
                _id: stay._id,
                name: stay.name,
                address: stay.loc.address
            }
        }
        return finalOrder
    }
    onSubmit = async (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        const { user, order } = this.props
        if (!user) {
            this.props.onSetMsg({ type: 'error', txt: 'Please Sign up/log in to continue' })
            return
        }
        if (!order.checkOut || !order.guests) {
            this.props.onSetMsg({ type: 'error', txt: 'Please fill in all the fields to continue' })
            return
        }
        const { isReserve } = this.state
        if (!isReserve) {
            this.setState({ isReserve: true, isPickingGuests: false, isPickingDates: false })
            return
        } else {
            const finalOrder = this.createFinalOrder()
            await this.props.onAddOrder(finalOrder)
            socketService.emit('on-reserve-order', finalOrder.host)
            this.setState({ isReserve: false })
            this.props.onSetMsg({ type: 'success', txt: 'Order Sent!' })
            setTimeout(() => {
                this.props.history.push('/')
            }, 2500);

        }
    }

    render() {
        const { isPickingDates, isPickingGuests, isFinalReserve, isReserve, reviewsNumber } = this.state
        const { stay, currOrder } = this.props

        if (!currOrder) return (
            <div className="flex align-center justify-center order-modal">
                <Loader
                    type="ThreeDots"
                    color='#FF385C'
                    height={100}
                    width={100}
                />
            </div>
        )
        return (
            <div className="order-modal">
                <div className="flex space-between align-center">
                    <span className="price fs22 medium">${stay.price}
                        <span className="fs16 light clr2"> / night</span>
                    </span>
                    <div className="rating-container flex align-center">
                        {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                        <span className="fs14 medium clr2"> 5</span>
                        <span className="rating medium fs14 clr1 "> ({reviewsNumber} reviews)  </span>
                    </div>
                </div>
                <form className="" >
                    <div className="flex column" onClick={this.preventPropagation}>
                        <div className={`input-container pointer flex ${isPickingDates ? 'focus' : ''}`}>
                            <div className={"check-in"}
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label fs10 bold">CHECK-IN:</span>
                                <input
                                    className="light fs14"
                                    type="text"
                                    placeholder="Add dates"
                                    name="checkIn"
                                    value={new Date(currOrder.checkIn).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) || ''}
                                    disabled
                                    style={{ outline: 'none' }}
                                    onClick={() => this.activeInput('date')}
                                />
                            </div>
                            <div className="check-out"
                                onClick={() => this.activeInput('date')}>
                                <span className="date-label fs10 bold ">CHECK-OUT:</span>
                                <input
                                    className="light fs14"
                                    type="text"
                                    placeholder="Add dates"
                                    name="checkOut"
                                    value={new Date(currOrder.checkOut).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) || ''}
                                    disabled
                                    style={{ outline: 'none' }}
                                />
                            </div>
                        </div>
                        <label className={`guests ${isPickingGuests ? 'focus' : ''}`}>
                            <div className="flex column  ">
                                <span className="bold fs10">GUESTS</span>
                                <button onClick={() => this.activeInput('guest')} className="fs14 confirm-guests light clr2" type="button" ><span></span>{this.getTotalGuests()}</button>
                            </div>
                        </label>
                    </div>
                    <div className="flex column">
                        {!isReserve && <button onMouseMove={this.onSetColor} ref={this.inputRef} className="confirm-order fs16" type="button" onClick={this.onSubmit}><span>Check availability</span></button>}
                        {isReserve && <button onMouseMove={this.onSetColor} ref={this.inputRef} className="confirm-order fs16 medium" onClick={this.onSubmit}>Reserve</button>}
                    </div>
                    <div className={`${isPickingGuests ? '' : 'none'}`}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
                    <div className={isPickingDates ? '' : 'none'}> {isPickingDates && <DatePicker order={currOrder} preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />} </div>
                    <div className={isReserve ? '' : 'none'}> {isReserve && <FinalPrice order={currOrder} stay={stay} />} </div>
                    <UserMsg animateClassName={isFinalReserve ? 'slide-in-bottom' : ''} />
                </form >
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
        currOrder: state.orderReducer.currOrder,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    onAddOrder,
    onUpdateOrder,
    onSetOrder,
    onSetMsg
}

export const OrderModal = connect(mapStateToProps, mapDispatchToProps)(withRouter(_OrderModal))