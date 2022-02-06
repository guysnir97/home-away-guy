import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SearchMini } from '../svgs/SearchMini'
import { utilService } from '../../services/util.service'
import { onSetOrder, onTogglePage } from '../../store/order.action';
import { MobileLocationForm } from '../home-page/MobileLocationForm'
import { MobileDateForm } from '../home-page/MobileDateForm'
import { MobileGuestsForm } from '../home-page/MobileGuestsForm'


class _MobileSearchBar extends Component {
    state = {
        criteria: {
            address: '',
            checkIn: '',
            checkOut: '',
            guests: {
                adult: 0,
                child: 0,
                infant: 0
            },
        },
        isSearchClicked: false,
        isPickingGuests: false,
        isPickingDates: false,
        isPickingLocation: false,
        isInsideHeader: true,
        dateFormat: null,
    }

    inputRef = React.createRef(null)



    handleChange = ({ target }) => {
        const { criteria } = this.state
        this.setState({ criteria: { ...criteria, [target.name]: target.value } })
    }

    handlePickingDates = (start, end) => {
        let { criteria } = this.state
        let { checkIn, checkOut } = criteria
        checkIn = start
        if (end) checkOut = end
        this.setState({ criteria: { ...criteria, checkIn, checkOut }, dateFormat: { start, end } })
    }

    handleGuestsChanege = (field, value) => {
        let { criteria } = this.state
        let { guests } = criteria
        this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
    }

    onChangeform = (ev, diff) => {
        ev.preventDefault()
        switch (diff) {
            case 'location': this.onLocationClick()
                break
            case 'date': this.onDateClick()
                break;
            case 'guest': this.onGuestClick()
                break;
            case 'order': this.onSubmit()
                break;
            case 'home': this.initState()
                break;
            default:
                break;
        }
    }
    onLocationClick = () => {
        if (!this.state.isPickingDates) this.props.onTogglePage();
        this.setState({ isSearchClicked: true, isPickingLocation: true, isPickingDates: false }, () => {
            this.inputRef.current.focus()
        })
    }
    onDateClick = () => {
        this.setState({ isPickingLocation: false, isPickingGuests: false, isPickingDates: true })
    }
    onGuestClick = () => {
        this.setState({ isPickingDates: false, isPickingGuests: true })

    }
    onSubmit = async () => {
        const { criteria, dateFormat } = this.state
        if (dateFormat) {
            criteria.checkIn = Date.parse(dateFormat.start)
            criteria.checkOut = Date.parse(dateFormat.end)
        }
        const queryString = utilService.makeQueryParams(criteria)
        await this.props.onSetOrder(criteria)
        this.props.history.push(`/stay?${queryString}`)
    }
    onLocationSubmit = async (order) => {
        const queryString = utilService.makeQueryParams(order)
        await this.props.onSetOrder(order)
        this.props.history.push(`/stay?${queryString}`)
    }
    initState = () => {
        this.setState({
            criteria: {
                address: '',
                checkIn: '',
                checkOut: '',
                guests: {
                    adult: 0,
                    child: 0,
                    infant: 0
                },
            },
            isPickingGuests: false,
            isPickingDates: false,
            isPickingLocation: false,
            dateFormat: null,
            isSearchClicked: false
        }, () => this.props.onTogglePage())
    }
    getDateValue = (date) => {
        if (new Date(date).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) === 'Invalid Date') return ''
        else return new Date(date).toLocaleString('en-IL', { month: 'short', day: 'numeric' })
    }
    onClearInputs = (diff) => {
        const { criteria } = this.state
        switch (diff) {
            case 'location': this.setState({ criteria: { ...criteria, address: '' } })
                break;
            case 'date': this.setState({ criteria: { ...criteria, checkIn: '', checkOut: '' }, dateFormat: null })
                break;
            case 'guest': this.setState({ criteria: { ...criteria, guests: { adult: 0, child: 0, infant: 0 } } })
                break;
            default:
        }
    }

    render() {
        const { isPickingLocation, isPickingDates, isPickingGuests, isSearchClicked } = this.state
        const { address, checkIn, checkOut } = this.state.criteria
        const { pathname } = this.props.history.location
        return (
            <section className="main-container-home">

                {!isSearchClicked &&
                    <div className={`mobile-header-container pointer`} onClick={(ev) => this.onChangeform(ev, 'location')}>
                        <div className="mobile-search-bar relative ">
                            <div className="flex align-center space-between">
                                <span className="fs14 fh18 medium fw-unset">Start your search</span>
                                <button className="search-bar-submit-mini flex "><SearchMini className="icon" /></button>
                            </div>
                        </div>
                    </div >
                }
                {
                    <>
                        <div className={`${isPickingLocation ? 'show' : ''} picking-location-container`} >
                            <MobileLocationForm
                                onChangeForm={this.onChangeform}
                                onImgClick={this.onLocationSubmit}
                                links={utilService.HomePageImgPopular()}
                                address={address}
                                ref={this.inputRef}
                                onChange={this.handleChange}
                                onClearInputs={this.onClearInputs} />
                        </div>
                        <div className={`${isPickingDates ? 'show' : ''} picking-dates-container`} >
                            <MobileDateForm
                                onChangeForm={this.onChangeform}
                                getDateValue={this.getDateValue}
                                checkIn={checkIn}
                                checkOut={checkOut}
                                handlePickingDates={this.handlePickingDates}
                                onClearInputs={this.onClearInputs} />

                        </div>
                        <div className={`${isPickingGuests ? 'show' : ''} picking-guest-container`} >
                            <MobileGuestsForm
                                pathname={pathname}
                                order={this.state.criteria}
                                onChangeForm={this.onChangeform}
                                handleGuestsChanege={this.handleGuestsChanege}
                                getDateValue={this.getDateValue}
                                onClearInputs={this.onClearInputs} />
                        </div>
                    </>
                }
            </section>
        )
    }
}
function mapStateToProps({ orderReducer }) {
    return {
        isMobileSearch: orderReducer.isMobileSearch
    }
}
const mapDispatchToProps = {
    onSetOrder,
    onTogglePage

}

export const MobileSearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MobileSearchBar))




