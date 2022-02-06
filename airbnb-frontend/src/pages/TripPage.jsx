import React from "react"
import { connect } from 'react-redux'
import { TripHero } from "../cmps/svgs/TripHero.jsx"
import { onLoadOrders, onSetOrder, onRemoveOrder } from "../store/order.action"
import { TripList } from "../cmps/trip/TripList"
import Loader from "react-loader-spinner";

class _TripPage extends React.Component {

    state = {
        isUpcoming: true,
        isPast: false,
        isOrders: false

    }
    componentDidMount() {
        const filter = { type: 'user', _id: this.props.user?._id }
        if (this.props.user) this.onLoadOrders(filter)
    }

    onLoadOrders = async (filter) => {
        const orders = await this.props.onLoadOrders(filter)
        if (orders.length) {
            this.setState({ isOrders: true })
        }
    }
    onSetOrder = (order) => {
        this.props.onSetOrder(order)
    }
    toggleTripStatus = (diff) => {
        if (diff === 'upcoming') {
            this.setState({ isUpcoming: true, isPast: false })
        } else {
            this.setState({ isPast: true, isUpcoming: false })
        }
    }
    onRemoveOrder = (orderId) => {
        this.props.onRemoveOrder(orderId)

    }
    onUpdateTrip = () => {

    }

    render() {
        const { isUpcoming, isPast } = this.state
        const { orders } = this.props
        if (!orders) return (
            <div className="flex align-center justify-center full">
                <Loader
                    type="ThreeDots"
                    color='#FF385C'
                    height={100}
                    width={100}
                />
            </div>
        )
        return (
            <section className="trip-container" >
                <h1 className="txt-trip bold fs32 clr2">Trips</h1>
                <div className="trip-btn flex column">
                    <div className="btn-menu flex ">
                        <button onClick={() => { this.toggleTripStatus('upcoming') }} className={`${isUpcoming ? 'active' : ''} btn-trip fs16 pointer medium clr5`}>Upcoming</button>
                        <button onClick={() => { this.toggleTripStatus('past') }} className={`${isPast ? 'active' : ''} btn-trip  fs16 pointer past medium clr5`}>Past</button>
                    </div>
                    <div className="trip-hero">
                        {(!orders.length || isPast) && < TripHero className="trip-hero" />}
                    </div>
                    {orders.length && !isPast && < TripList orders={orders} onSetOrder={this.onSetOrder} onRemoveOrder={this.onRemoveOrder} />}

                </div>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        orders: state.orderReducer.orders,
        user: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    onLoadOrders,
    onSetOrder,
    onRemoveOrder
}

export const TripPage = connect(mapStateToProps, mapDispatchToProps)(_TripPage)


